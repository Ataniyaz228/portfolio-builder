import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import ViewTracker from '@/components/ViewTracker';
import TemplateRenderer from './TemplateRenderer';

export const dynamic = 'force-dynamic';

async function getProfileData(username: string) {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';
    const res = await fetch(`${baseUrl}/users/${username}/full`, {
      cache: 'no-store',
    });
    if (!res.ok) return null;
    return res.json();
  } catch (error) {
    return null;
  }
}

export async function generateMetadata({ params }: { params: Promise<{ username: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const profile = await getProfileData(resolvedParams.username);

  if (!profile) {
    return { title: 'Profile Not Found — Adsum' };
  }

  const name = profile.full_name || profile.username;
  const bio = profile.bio?.replace(/<[^>]*>/g, '').slice(0, 160) || `${name}'s portfolio on Adsum`;
  const skills = profile.skills?.map((s: any) => s.name).slice(0, 5).join(', ');
  const description = skills ? `${bio} | Skills: ${skills}` : bio;

  return {
    title: `${name} — Portfolio | Adsum`,
    description,
    openGraph: {
      title: `${name} — Portfolio`,
      description,
      type: 'profile',
      url: `/u/${resolvedParams.username}`,
      ...(profile.avatar_url && { images: [{ url: profile.avatar_url, width: 200, height: 200, alt: name }] }),
    },
    twitter: {
      card: 'summary',
      title: `${name} — Portfolio`,
      description,
      ...(profile.avatar_url && { images: [profile.avatar_url] }),
    },
    robots: { index: true, follow: true },
  };
}

export default async function PublicPortfolio({ params }: { params: Promise<{ username: string }> }) {
  const resolvedParams = await params;
  const profile = await getProfileData(resolvedParams.username);

  if (!profile) {
    notFound();
  }

  const templateId = profile.template_id || 'creative';

  // Schema.org JSON-LD
  const schemaOrgData = {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    mainEntity: {
      '@type': 'Person',
      name: profile.full_name || profile.username,
      description: profile.bio?.replace(/<[^>]*>/g, '').slice(0, 160),
      url: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/u/${resolvedParams.username}`,
      image: profile.avatar_url,
      sameAs: [
        profile.github_url,
        profile.linkedin_url,
        profile.twitter_url,
      ].filter(Boolean),
      knowsAbout: profile.skills?.map((s: any) => s.name),
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOrgData) }}
      />
      <ViewTracker username={resolvedParams.username} />
      <TemplateRenderer profile={profile} username={resolvedParams.username} templateId={templateId} />
    </>
  );
}
