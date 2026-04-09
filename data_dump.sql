--
-- PostgreSQL database dump
--

\restrict SRGiY1AQakDzMCtH1dvDllABeAtSn7R4XX5vnphiN4cFfUPTtd4UWUa1CSrNFsz

-- Dumped from database version 18.0
-- Dumped by pg_dump version 18.0

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Data for Name: contact_messages; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.contact_messages (id, message, is_read, updated_at, user_id, sender_name, sender_email, created_at) VALUES ('fa696788-052b-45d7-93d5-22c20b616161', 'Привет Чел! Присоединяйся к нам', true, '2026-03-25 15:54:07.147775', '5259f13b-f071-4b5d-a664-0d1b88cc4b86', 'noname', 'asapp@gmail.com', '2026-03-25 15:53:19.188112');


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.users (id, bio, avatar_url, github_url, linkedin_url, twitter_url, username, email, password_hash, full_name, created_at, updated_at, profile_views, theme_color, template_id) VALUES ('06dcd923-475e-4266-9529-268d29c118fd', '<p>Full-stack Developer | Open-source enthusiast | Building scalable web solutions with Node.js & React. Always learning, one commit at a time.</p>', 'http://localhost:3001/uploads/c8e7d80f-6217-4c63-abb1-695ffe92c876.jpg', 'https://github.com/abdurakhim2404', 'https://www.linkedin.com/in/abdurakhimmergali', 'https://x.com/AbdurahimMer', 'abdurakhim', 'testuser@gmail.com', '$2b$10$sJrtqPLp4/ZPP0.MSVfkp.FYgspMFC1cQCHck8ZFLs/LreeSmokle', 'Abdurakhim Mergali', '2026-04-01 11:20:46.685011', '2026-04-06 22:57:30.051874', 55, 'purple', 'professional');
INSERT INTO public.users (id, bio, avatar_url, github_url, linkedin_url, twitter_url, username, email, password_hash, full_name, created_at, updated_at, profile_views, theme_color, template_id) VALUES ('5259f13b-f071-4b5d-a664-0d1b88cc4b86', '<p>i&nbsp;am&nbsp;full-stuck&nbsp;developer</p>', 'http://localhost:3001/uploads/ef1fac56-6612-4af8-9c9f-f9829d2ce99f.jpeg', '', '', '', 'admin', 'admin@adsum.com', '$2b$10$UyU3hHD6BhXD4b8NP4qfn.zy0FXndPzUOxKg7b47X6g3e0mOI7gm6', 'Admin User', '2026-03-25 12:25:19.396391', '2026-03-30 11:01:46.255292', 7, 'purple', 'creative');
INSERT INTO public.users (id, bio, avatar_url, github_url, linkedin_url, twitter_url, username, email, password_hash, full_name, created_at, updated_at, profile_views, theme_color, template_id) VALUES ('8c58812b-0de0-4896-9c13-f44f3aada338', '', 'http://localhost:3001/uploads/806c34af-344b-479a-96b1-bc5483313ad5.jpeg', '', '', '', 'abdu', 'bitpeitintirlik@gmail.com', '$2b$10$2si3LpFvKjp45joKKv6x/.OTHZhtoepHIUe/4YEIkUIzywK0iSRHa', 'abdurakhim', '2026-03-30 11:41:51.608419', '2026-03-30 12:26:54.741175', 1, 'amber', 'creative');


--
-- Data for Name: experiences; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.experiences (id, description, start_date, end_date, is_current, user_id, role, company, created_at, updated_at, order_index) VALUES ('c1751c65-f59b-468e-bc65-185d391699d8', '<ul><li>Developed&nbsp;<strong>15+&nbsp;high-fidelity&nbsp;UI&nbsp;components</strong>&nbsp;using&nbsp;Tailwind&nbsp;CSS&nbsp;/&nbsp;Styled&nbsp;Components,&nbsp;following&nbsp;strict&nbsp;Design&nbsp;System&nbsp;guidelines.</li><li>Successfully&nbsp;integrated&nbsp;<strong>Stripe/PayPal&nbsp;payment&nbsp;gateways</strong>,&nbsp;leading&nbsp;to&nbsp;a&nbsp;seamless&nbsp;checkout&nbsp;experience.</li><li>Improved&nbsp;user&nbsp;engagement&nbsp;by&nbsp;<strong>10%</strong>&nbsp;through&nbsp;the&nbsp;implementation&nbsp;of&nbsp;interactive&nbsp;dashboards&nbsp;and&nbsp;real-time&nbsp;notifications.</li><li>Ensured&nbsp;<strong>100%&nbsp;cross-browser&nbsp;compatibility</strong>&nbsp;and&nbsp;mobile&nbsp;responsiveness&nbsp;for&nbsp;the&nbsp;core&nbsp;product.</li></ul>', '2022-03-20', '2023-10-29', false, '06dcd923-475e-4266-9529-268d29c118fd', 'Frontend Developer', 'Focus', '2026-04-01 22:32:26.655596', '2026-04-01 23:29:03.727366', 0);
INSERT INTO public.experiences (id, description, start_date, end_date, is_current, user_id, role, company, created_at, updated_at, order_index) VALUES ('1184b173-b2e1-4edf-82a9-f1c34bc7f6a9', '<p>Code.&nbsp;Debug.&nbsp;Repeat.&nbsp;👨‍💻&nbsp;<strong>Exploring&nbsp;the&nbsp;world</strong>&nbsp;of&nbsp;AI&nbsp;and&nbsp;Web&nbsp;Dev.&nbsp;Based&nbsp;in&nbsp;<u><a href="Astana" rel="noopener noreferrer" target="_blank">Astana</a></u>.</p>', '2020-02-02', '2022-06-16', false, '06dcd923-475e-4266-9529-268d29c118fd', 'Front Developer', 'Tatenl.cl', '2026-04-01 21:31:02.816214', '2026-04-01 23:29:03.729307', 1);
INSERT INTO public.experiences (id, description, start_date, end_date, is_current, user_id, role, company, created_at, updated_at, order_index) VALUES ('318d6fe9-817f-4179-9766-9e7223916907', '<h2>Unit&nbsp;and&nbsp;Integration&nbsp;tests</h2><ul><li><ul><li>Configured&nbsp;<strong>CI/CD&nbsp;pipelines</strong>&nbsp;(GitHub&nbsp;Actions/GitLab&nbsp;CI)&nbsp;for&nbsp;automated&nbsp;deployment&nbsp;and&nbsp;linting.</li></ul></li></ul><blockquote class="ql-indent-1">Mentored&nbsp;2&nbsp;junior&nbsp;developers,&nbsp;conducting&nbsp;regular&nbsp;code&nbsp;reviews&nbsp;and&nbsp;technical&nbsp;workshops.</blockquote><p></p>', '2025-01-01', NULL, true, '06dcd923-475e-4266-9529-268d29c118fd', 'Frontend Developer', 'Too', '2026-04-01 22:38:27.045954', '2026-04-01 23:29:03.730956', 2);


--
-- Data for Name: profile_views; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.profile_views (id, user_id, viewed_at, ip_hash, referrer, user_agent) VALUES ('85d7f756-a038-49a6-b432-fccfd4dfb1f2', '06dcd923-475e-4266-9529-268d29c118fd', '2026-04-01 21:17:19.612', NULL, NULL, NULL);
INSERT INTO public.profile_views (id, user_id, viewed_at, ip_hash, referrer, user_agent) VALUES ('8f79590b-72fb-47cd-92c9-0846533258e9', '06dcd923-475e-4266-9529-268d29c118fd', '2026-04-01 21:31:10.437', NULL, NULL, NULL);
INSERT INTO public.profile_views (id, user_id, viewed_at, ip_hash, referrer, user_agent) VALUES ('324b20c6-d0e7-41c6-9dcf-dc1f5c53c520', '06dcd923-475e-4266-9529-268d29c118fd', '2026-04-01 21:34:47.827', NULL, NULL, NULL);
INSERT INTO public.profile_views (id, user_id, viewed_at, ip_hash, referrer, user_agent) VALUES ('acaef4a4-c740-40ac-9e2a-3dd466fdd459', '06dcd923-475e-4266-9529-268d29c118fd', '2026-04-01 21:35:17.066', NULL, NULL, NULL);
INSERT INTO public.profile_views (id, user_id, viewed_at, ip_hash, referrer, user_agent) VALUES ('7a15ce94-ba12-47df-b52e-9418942e3cf6', '06dcd923-475e-4266-9529-268d29c118fd', '2026-04-01 21:35:24.812', NULL, NULL, NULL);
INSERT INTO public.profile_views (id, user_id, viewed_at, ip_hash, referrer, user_agent) VALUES ('82dd4f45-56c0-4503-8d1f-adefda863f74', '06dcd923-475e-4266-9529-268d29c118fd', '2026-04-01 21:35:38.795', NULL, NULL, NULL);
INSERT INTO public.profile_views (id, user_id, viewed_at, ip_hash, referrer, user_agent) VALUES ('08b19615-1f72-4dca-b575-4ff5f5f6922b', '06dcd923-475e-4266-9529-268d29c118fd', '2026-04-01 21:35:56.301', NULL, NULL, NULL);
INSERT INTO public.profile_views (id, user_id, viewed_at, ip_hash, referrer, user_agent) VALUES ('ff82d2d8-cca8-42fa-aced-1810985a913c', '06dcd923-475e-4266-9529-268d29c118fd', '2026-04-01 21:36:22.797', NULL, NULL, NULL);
INSERT INTO public.profile_views (id, user_id, viewed_at, ip_hash, referrer, user_agent) VALUES ('a05c1971-b52c-410b-a0f6-fdd5f408aff9', '06dcd923-475e-4266-9529-268d29c118fd', '2026-04-01 21:53:19.115', NULL, NULL, NULL);
INSERT INTO public.profile_views (id, user_id, viewed_at, ip_hash, referrer, user_agent) VALUES ('46f1481f-8d62-470f-9d0f-db1b5b78907d', '06dcd923-475e-4266-9529-268d29c118fd', '2026-04-01 21:54:28.344', NULL, NULL, NULL);
INSERT INTO public.profile_views (id, user_id, viewed_at, ip_hash, referrer, user_agent) VALUES ('a7f4c367-46bd-403d-9aa4-9f8d68c6ce1c', '06dcd923-475e-4266-9529-268d29c118fd', '2026-04-01 21:54:52.401', NULL, NULL, NULL);
INSERT INTO public.profile_views (id, user_id, viewed_at, ip_hash, referrer, user_agent) VALUES ('dab3ee4d-7fff-4ce0-8084-90d1458926ef', '06dcd923-475e-4266-9529-268d29c118fd', '2026-04-01 21:55:33.622', NULL, NULL, NULL);
INSERT INTO public.profile_views (id, user_id, viewed_at, ip_hash, referrer, user_agent) VALUES ('a9b82073-b04d-4873-8fa4-65d0ccefa12a', '06dcd923-475e-4266-9529-268d29c118fd', '2026-04-01 21:55:50.984', NULL, NULL, NULL);
INSERT INTO public.profile_views (id, user_id, viewed_at, ip_hash, referrer, user_agent) VALUES ('4d5d2bb0-bf54-4027-a156-38088b9662f5', '06dcd923-475e-4266-9529-268d29c118fd', '2026-04-01 21:56:06.451', NULL, NULL, NULL);
INSERT INTO public.profile_views (id, user_id, viewed_at, ip_hash, referrer, user_agent) VALUES ('399c920a-ef1e-47de-9fb4-0c28c17c5817', '06dcd923-475e-4266-9529-268d29c118fd', '2026-04-01 22:03:14.787', NULL, NULL, NULL);
INSERT INTO public.profile_views (id, user_id, viewed_at, ip_hash, referrer, user_agent) VALUES ('2876a70d-2672-449f-952e-eef2efa063f2', '06dcd923-475e-4266-9529-268d29c118fd', '2026-04-01 22:09:05.056', NULL, NULL, NULL);
INSERT INTO public.profile_views (id, user_id, viewed_at, ip_hash, referrer, user_agent) VALUES ('6010519f-d908-40e2-87de-242b894234dc', '06dcd923-475e-4266-9529-268d29c118fd', '2026-04-01 22:12:05.527', NULL, NULL, NULL);
INSERT INTO public.profile_views (id, user_id, viewed_at, ip_hash, referrer, user_agent) VALUES ('432e92fd-a589-4dd7-8d76-69f831ef60e5', '06dcd923-475e-4266-9529-268d29c118fd', '2026-04-01 22:24:22.941', NULL, NULL, NULL);
INSERT INTO public.profile_views (id, user_id, viewed_at, ip_hash, referrer, user_agent) VALUES ('14c61169-7416-426a-b2f3-528ad7380379', '06dcd923-475e-4266-9529-268d29c118fd', '2026-04-01 22:32:31.945', NULL, NULL, NULL);
INSERT INTO public.profile_views (id, user_id, viewed_at, ip_hash, referrer, user_agent) VALUES ('b2004754-b4e5-4317-8c63-f6eb37b0b4b0', '06dcd923-475e-4266-9529-268d29c118fd', '2026-04-01 22:34:19.015', NULL, NULL, NULL);
INSERT INTO public.profile_views (id, user_id, viewed_at, ip_hash, referrer, user_agent) VALUES ('ebf36ad5-39e4-41fd-803a-4bbdcb29a730', '06dcd923-475e-4266-9529-268d29c118fd', '2026-04-01 22:38:34.408', NULL, NULL, NULL);
INSERT INTO public.profile_views (id, user_id, viewed_at, ip_hash, referrer, user_agent) VALUES ('ad09a7a5-c21d-4809-8fe2-531d883634fc', '06dcd923-475e-4266-9529-268d29c118fd', '2026-04-01 22:39:08.654', NULL, NULL, NULL);
INSERT INTO public.profile_views (id, user_id, viewed_at, ip_hash, referrer, user_agent) VALUES ('df8731f4-46a6-4788-a9c9-79b235db9590', '06dcd923-475e-4266-9529-268d29c118fd', '2026-04-01 22:41:17.486', NULL, NULL, NULL);
INSERT INTO public.profile_views (id, user_id, viewed_at, ip_hash, referrer, user_agent) VALUES ('d3f7dc06-d47d-4057-b545-08aaf577358f', '06dcd923-475e-4266-9529-268d29c118fd', '2026-04-01 22:59:50.528', NULL, NULL, NULL);
INSERT INTO public.profile_views (id, user_id, viewed_at, ip_hash, referrer, user_agent) VALUES ('90095fb3-464d-4fc1-be01-5894bd58dee5', '06dcd923-475e-4266-9529-268d29c118fd', '2026-04-01 23:00:19.105', NULL, NULL, NULL);
INSERT INTO public.profile_views (id, user_id, viewed_at, ip_hash, referrer, user_agent) VALUES ('aec8f1ab-29ed-40af-a67c-d411256459e7', '06dcd923-475e-4266-9529-268d29c118fd', '2026-04-01 23:06:11.443', NULL, NULL, NULL);
INSERT INTO public.profile_views (id, user_id, viewed_at, ip_hash, referrer, user_agent) VALUES ('7ecadd03-1074-4f6e-b426-49c9023515e6', '06dcd923-475e-4266-9529-268d29c118fd', '2026-04-01 23:09:47.131', NULL, NULL, NULL);
INSERT INTO public.profile_views (id, user_id, viewed_at, ip_hash, referrer, user_agent) VALUES ('b93e2ce1-b7d2-4c9e-9f52-7a798d2f071f', '06dcd923-475e-4266-9529-268d29c118fd', '2026-04-01 23:10:16.642', NULL, NULL, NULL);
INSERT INTO public.profile_views (id, user_id, viewed_at, ip_hash, referrer, user_agent) VALUES ('838eb3aa-ff89-415d-8442-70376359bbe8', '06dcd923-475e-4266-9529-268d29c118fd', '2026-04-01 23:22:43.855', NULL, NULL, NULL);
INSERT INTO public.profile_views (id, user_id, viewed_at, ip_hash, referrer, user_agent) VALUES ('9d11db77-692b-418b-90f8-ad31c2dc7154', '06dcd923-475e-4266-9529-268d29c118fd', '2026-04-01 23:23:05.261', NULL, NULL, NULL);
INSERT INTO public.profile_views (id, user_id, viewed_at, ip_hash, referrer, user_agent) VALUES ('f2ef2ae1-5c68-4c9d-a1f8-5be4ffa7e71f', '06dcd923-475e-4266-9529-268d29c118fd', '2026-04-01 23:28:28.073', NULL, NULL, NULL);
INSERT INTO public.profile_views (id, user_id, viewed_at, ip_hash, referrer, user_agent) VALUES ('a02ccd2a-8b3e-42ed-a81c-3c01a11ad9d2', '06dcd923-475e-4266-9529-268d29c118fd', '2026-04-02 13:00:13.777', NULL, NULL, NULL);
INSERT INTO public.profile_views (id, user_id, viewed_at, ip_hash, referrer, user_agent) VALUES ('8f406386-773e-4151-905e-1db24f570e43', '06dcd923-475e-4266-9529-268d29c118fd', '2026-04-02 13:00:28.614', NULL, NULL, NULL);
INSERT INTO public.profile_views (id, user_id, viewed_at, ip_hash, referrer, user_agent) VALUES ('a99cc8fe-d633-4d94-ad99-eee447f0f319', '06dcd923-475e-4266-9529-268d29c118fd', '2026-04-02 13:00:39.941', NULL, NULL, NULL);
INSERT INTO public.profile_views (id, user_id, viewed_at, ip_hash, referrer, user_agent) VALUES ('07aed28a-be9c-435c-ad19-7d848c476639', '06dcd923-475e-4266-9529-268d29c118fd', '2026-04-02 13:01:04.51', NULL, NULL, NULL);
INSERT INTO public.profile_views (id, user_id, viewed_at, ip_hash, referrer, user_agent) VALUES ('01074ea6-ddf4-4b8c-b79b-9ae6291392b4', '06dcd923-475e-4266-9529-268d29c118fd', '2026-04-02 13:01:13.333', NULL, NULL, NULL);
INSERT INTO public.profile_views (id, user_id, viewed_at, ip_hash, referrer, user_agent) VALUES ('b7dffe04-5301-42a4-9b95-40c18860ee12', '06dcd923-475e-4266-9529-268d29c118fd', '2026-04-02 13:01:25.843', NULL, NULL, NULL);
INSERT INTO public.profile_views (id, user_id, viewed_at, ip_hash, referrer, user_agent) VALUES ('1bd89132-a5a0-44bf-82a9-83b94474813b', '06dcd923-475e-4266-9529-268d29c118fd', '2026-04-02 13:05:18.734', NULL, NULL, NULL);
INSERT INTO public.profile_views (id, user_id, viewed_at, ip_hash, referrer, user_agent) VALUES ('d73553ef-4efa-4a65-8add-3b2b1f3b8417', '06dcd923-475e-4266-9529-268d29c118fd', '2026-04-03 01:32:21.27', NULL, NULL, NULL);
INSERT INTO public.profile_views (id, user_id, viewed_at, ip_hash, referrer, user_agent) VALUES ('dae5d7ff-f5f1-42c1-996e-eb8a409cb50b', '06dcd923-475e-4266-9529-268d29c118fd', '2026-04-03 01:37:00.399', NULL, NULL, NULL);
INSERT INTO public.profile_views (id, user_id, viewed_at, ip_hash, referrer, user_agent) VALUES ('bd3823e1-5d6b-42e2-97eb-800b8a9c0a14', '06dcd923-475e-4266-9529-268d29c118fd', '2026-04-05 18:24:17.549', NULL, NULL, NULL);
INSERT INTO public.profile_views (id, user_id, viewed_at, ip_hash, referrer, user_agent) VALUES ('68d2b15c-cad6-41cb-bb2b-6576e33d13f9', '06dcd923-475e-4266-9529-268d29c118fd', '2026-04-05 18:24:18.302', NULL, NULL, NULL);
INSERT INTO public.profile_views (id, user_id, viewed_at, ip_hash, referrer, user_agent) VALUES ('28250b0f-69e8-4e2d-bddd-64abcf7ea040', '06dcd923-475e-4266-9529-268d29c118fd', '2026-04-05 18:36:42.48', NULL, NULL, NULL);
INSERT INTO public.profile_views (id, user_id, viewed_at, ip_hash, referrer, user_agent) VALUES ('c63fa7f2-03a1-4120-8cd6-538bf5162eec', '06dcd923-475e-4266-9529-268d29c118fd', '2026-04-06 22:57:19.534', NULL, NULL, NULL);
INSERT INTO public.profile_views (id, user_id, viewed_at, ip_hash, referrer, user_agent) VALUES ('d3522d8e-2c06-4a87-b012-373ff47a75f4', '06dcd923-475e-4266-9529-268d29c118fd', '2026-04-06 22:57:30.052', NULL, NULL, NULL);


--
-- Data for Name: projects; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.projects (id, description, user_id, technologies, title, image_url, live_url, github_url, created_at, updated_at, order_index, image_flip_horizontal, image_flip_vertical, image_rotation) VALUES ('f5386264-4e92-41a4-8095-9f63cbb71782', '<p>The&nbsp;old&nbsp;bookstore&nbsp;on&nbsp;the&nbsp;corner&nbsp;didn’t&nbsp;just&nbsp;sell&nbsp;paper&nbsp;and&nbsp;ink;&nbsp;it&nbsp;sold&nbsp;<strong>whispers&nbsp;of&nbsp;forgotten&nbsp;timelines</strong>.&nbsp;Behind&nbsp;a&nbsp;stack&nbsp;of&nbsp;dusty&nbsp;encyclopedias,&nbsp;a&nbsp;cat&nbsp;named&nbsp;<em>Barnaby</em>—who&nbsp;wore&nbsp;a&nbsp;tiny&nbsp;velvet&nbsp;bowtie&nbsp;for&nbsp;no&nbsp;apparent&nbsp;reason—guarded&nbsp;a&nbsp;secret&nbsp;door.&nbsp;If&nbsp;you&nbsp;hummed&nbsp;a&nbsp;jazz&nbsp;tune&nbsp;at&nbsp;just&nbsp;the&nbsp;right&nbsp;frequency,&nbsp;the&nbsp;door&nbsp;would&nbsp;creak&nbsp;open,&nbsp;revealing&nbsp;a&nbsp;garden&nbsp;where&nbsp;the&nbsp;flowers&nbsp;bloomed&nbsp;in&nbsp;neon&nbsp;colors&nbsp;and&nbsp;the&nbsp;clouds&nbsp;tasted&nbsp;like&nbsp;lemon&nbsp;sorbet.</p>', '06dcd923-475e-4266-9529-268d29c118fd', 'React,Node.js,Python,C#', 'My awsome project', 'http://localhost:3001/uploads/ea597de6-9afc-4b61-b3c6-16828d3ea7cb.jpg', '', 'https://github.com/abdurakhim2404/Sheber-project.git', '2026-04-01 11:41:14.27216', '2026-04-06 18:37:22.024931', 0, false, false, 270);
INSERT INTO public.projects (id, description, user_id, technologies, title, image_url, live_url, github_url, created_at, updated_at, order_index, image_flip_horizontal, image_flip_vertical, image_rotation) VALUES ('0c2397eb-e910-4bc6-bbd8-4990f58995cd', '<h1>Implemented&nbsp;</h1><p><strong>lazy&nbsp;loading</strong>&nbsp;and&nbsp;image&nbsp;optimization&nbsp;techniques&nbsp;to&nbsp;improve&nbsp;First&nbsp;Contentful&nbsp;Paint.</p>', '06dcd923-475e-4266-9529-268d29c118fd', 'Next.js,CSS,HTML,Java', 'Optimized web application performance', 'http://localhost:3001/uploads/b024430b-5d63-4345-a253-28656bea4683.jpg', '', '', '2026-04-01 22:41:12.777702', '2026-04-06 17:05:10.227838', 1, false, false, 0);
INSERT INTO public.projects (id, description, user_id, technologies, title, image_url, live_url, github_url, created_at, updated_at, order_index, image_flip_horizontal, image_flip_vertical, image_rotation) VALUES ('043f1695-2a15-41eb-8d09-3cba7cea56fd', '<p>lllllllll</p><ul><li>Проверка&nbsp;цитаты&nbsp;с&nbsp;<strong>длинным&nbsp;текстом</strong>,&nbsp;чтобы&nbsp;посмотреть,&nbsp;как&nbsp;ведет&nbsp;себя&nbsp;контейнер&nbsp;описания&nbsp;при&nbsp;расширении.</li></ul>', '5259f13b-f071-4b5d-a664-0d1b88cc4b86', 'С++,React,PostgreSQL,Next.js', ' модального окна в браузере', 'http://localhost:3001/uploads/b754e577-15ef-48b9-8e1b-86034564baa3.jpeg', '', '', '2026-03-25 23:09:54.143682', '2026-03-25 23:29:18.372499', 0, false, false, 0);
INSERT INTO public.projects (id, description, user_id, technologies, title, image_url, live_url, github_url, created_at, updated_at, order_index, image_flip_horizontal, image_flip_vertical, image_rotation) VALUES ('b1f53670-dec0-4405-9184-6f709e5d9c32', '<p>Ebsb&nbsp;ihsiiiisd&nbsp;ojhhwe&nbsp;jijosjdiji&nbsp;j[lwopo&nbsp;qwiyyeu&nbsp;sdfm,co&nbsp;dbbsn,kk&nbsp;p&nbsp;soj&nbsp;ihiweokd,,;lwoe&nbsp;dsm&nbsp;&nbsp;oidjopkskl&nbsp;skdofi&nbsp;sfewm&nbsp;fsdoios;e</p>', '5259f13b-f071-4b5d-a664-0d1b88cc4b86', '', 'hz kto', 'http://localhost:3001/uploads/7cd1fd59-6bd9-4d9f-b8d3-19badbc57f30.jpeg', '', '', '2026-03-25 23:21:04.934943', '2026-03-25 23:29:18.37477', 1, false, false, 0);


--
-- Data for Name: project_images; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.project_images (id, project_id, image_url, order_index, created_at, flip_horizontal, flip_vertical, rotation_degrees) VALUES ('ca3b7456-a1ed-42cc-a64d-0d161bfef5ce', 'f5386264-4e92-41a4-8095-9f63cbb71782', 'http://localhost:3001/uploads/64cf2aa7-e0ef-4b29-99bc-30b090297735.jpg', 4, '2026-04-06 18:36:53.996025', false, false, 0);
INSERT INTO public.project_images (id, project_id, image_url, order_index, created_at, flip_horizontal, flip_vertical, rotation_degrees) VALUES ('2f79aad7-34c9-44ab-973e-343311bc7533', 'f5386264-4e92-41a4-8095-9f63cbb71782', 'http://localhost:3001/uploads/fa55bb85-973e-47fd-9ead-9cfa3948aecf.jpg', 0, '2026-04-06 18:26:15.614395', false, false, 0);
INSERT INTO public.project_images (id, project_id, image_url, order_index, created_at, flip_horizontal, flip_vertical, rotation_degrees) VALUES ('9fafa81c-56d9-453d-8ad8-bc1aa3dbe3a2', 'f5386264-4e92-41a4-8095-9f63cbb71782', 'http://localhost:3001/uploads/95957d50-f3d0-4639-891f-7857d73c3c9d.jpg', 1, '2026-04-06 18:25:37.534564', false, true, 270);
INSERT INTO public.project_images (id, project_id, image_url, order_index, created_at, flip_horizontal, flip_vertical, rotation_degrees) VALUES ('7ad97e71-0ca1-4c0d-9c04-42a0daabe286', '0c2397eb-e910-4bc6-bbd8-4990f58995cd', 'http://localhost:3001/uploads/e7f67ebd-acf7-427d-8da2-1b08ea617448.jpg', 0, '2026-04-06 17:04:12.70761', false, false, 0);
INSERT INTO public.project_images (id, project_id, image_url, order_index, created_at, flip_horizontal, flip_vertical, rotation_degrees) VALUES ('ecadcadf-a76f-4493-9a2c-3aefb27022f4', '0c2397eb-e910-4bc6-bbd8-4990f58995cd', 'http://localhost:3001/uploads/89774f84-73d9-450a-9ef7-5be681bd129f.jpg', 1, '2026-04-06 17:04:16.905571', false, false, 0);
INSERT INTO public.project_images (id, project_id, image_url, order_index, created_at, flip_horizontal, flip_vertical, rotation_degrees) VALUES ('d29e784c-6b6e-4af4-a1f8-e7e4471baee9', '0c2397eb-e910-4bc6-bbd8-4990f58995cd', 'http://localhost:3001/uploads/64fd432c-7cf1-4eb7-b589-7d439ae28672.jpg', 2, '2026-04-06 17:04:21.227117', false, false, 0);
INSERT INTO public.project_images (id, project_id, image_url, order_index, created_at, flip_horizontal, flip_vertical, rotation_degrees) VALUES ('67baaf6f-f677-4d21-a232-e0a8ff0b90c0', '0c2397eb-e910-4bc6-bbd8-4990f58995cd', 'http://localhost:3001/uploads/e73407f5-0672-4fff-b921-336a521b7461.jpg', 3, '2026-04-06 17:04:25.298949', false, false, 0);
INSERT INTO public.project_images (id, project_id, image_url, order_index, created_at, flip_horizontal, flip_vertical, rotation_degrees) VALUES ('7b8a5352-52a6-4917-b6d5-2a7a6a90ecf7', '0c2397eb-e910-4bc6-bbd8-4990f58995cd', 'http://localhost:3001/uploads/00c1edc3-4dd6-4b84-9b39-1cdc3897d979.jpg', 4, '2026-04-06 17:04:30.584966', false, false, 0);
INSERT INTO public.project_images (id, project_id, image_url, order_index, created_at, flip_horizontal, flip_vertical, rotation_degrees) VALUES ('b7a2985b-51c4-49a5-b1f5-12afce76fe16', 'f5386264-4e92-41a4-8095-9f63cbb71782', 'http://localhost:3001/uploads/97a8dfaf-7518-4d76-9062-b8ff1739879b.jpg', 2, '2026-04-06 18:26:23.068691', false, false, 270);
INSERT INTO public.project_images (id, project_id, image_url, order_index, created_at, flip_horizontal, flip_vertical, rotation_degrees) VALUES ('119949b3-1903-4103-adf5-48f6833af31c', 'f5386264-4e92-41a4-8095-9f63cbb71782', 'http://localhost:3001/uploads/601c87a3-5b14-4302-bdb1-5aa7e7fad822.jpg', 3, '2026-04-06 18:36:48.36894', false, true, 270);


--
-- Data for Name: skills; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.skills (id, user_id, proficiency, name, created_at, updated_at, order_index, category) VALUES ('ccb475e6-8b6a-4f20-a2d0-e0f080a1ce08', '06dcd923-475e-4266-9529-268d29c118fd', 75, 'Docker', '2026-04-01 22:21:38.078487', '2026-04-03 01:44:37.427765', 0, 'Design');
INSERT INTO public.skills (id, user_id, proficiency, name, created_at, updated_at, order_index, category) VALUES ('1db8e063-8b8c-4159-9e89-d73cd2cc86e4', '06dcd923-475e-4266-9529-268d29c118fd', 25, 'Next.js', '2026-04-01 22:22:41.647894', '2026-04-03 01:44:37.429467', 1, 'Frontend');
INSERT INTO public.skills (id, user_id, proficiency, name, created_at, updated_at, order_index, category) VALUES ('7e8e8e62-f5a3-46e3-a2ff-ef62f4a3c7d3', '06dcd923-475e-4266-9529-268d29c118fd', 90, 'English', '2026-04-01 22:21:58.153185', '2026-04-03 01:44:37.430778', 2, 'Languages');
INSERT INTO public.skills (id, user_id, proficiency, name, created_at, updated_at, order_index, category) VALUES ('bbd2df13-5532-43e4-83cb-aa8de460e17b', '06dcd923-475e-4266-9529-268d29c118fd', 100, 'python', '2026-04-01 16:11:29.289267', '2026-04-03 01:44:37.432338', 3, 'General');
INSERT INTO public.skills (id, user_id, proficiency, name, created_at, updated_at, order_index, category) VALUES ('e72f6005-1308-4bca-8e68-4fa6799a8517', '06dcd923-475e-4266-9529-268d29c118fd', 75, 'React', '2026-04-01 16:11:10.434895', '2026-04-03 01:44:37.433878', 4, 'General');


--
-- Data for Name: testimonials; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.testimonials (id, author_name, author_role, content, avatar_url, order_index, user_id, created_at, updated_at) VALUES ('d7d11a76-1e49-40f4-a9ae-ed4bdfb6b8f3', 'Adrean Nell', 'CEO at TechCorp', 'An amazing developer to work with', '', 0, '06dcd923-475e-4266-9529-268d29c118fd', '2026-04-01 21:34:39.617914', '2026-04-02 13:07:29.209541');


--
-- PostgreSQL database dump complete
--

\unrestrict SRGiY1AQakDzMCtH1dvDllABeAtSn7R4XX5vnphiN4cFfUPTtd4UWUa1CSrNFsz

