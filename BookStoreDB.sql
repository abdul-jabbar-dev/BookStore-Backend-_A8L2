--
-- PostgreSQL database dump
--

-- Dumped from database version 15.4
-- Dumped by pg_dump version 15.4

-- Started on 2023-09-17 17:09:59

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 5 (class 2615 OID 125735)
-- Name: public; Type: SCHEMA; Schema: -; Owner: postgres
--

-- *not* creating schema, since initdb creates it


ALTER SCHEMA public OWNER TO postgres;

--
-- TOC entry 3399 (class 0 OID 0)
-- Dependencies: 5
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: postgres
--

COMMENT ON SCHEMA public IS '';


--
-- TOC entry 871 (class 1247 OID 125873)
-- Name: ORDER_STATUS; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."ORDER_STATUS" AS ENUM (
    'Pending',
    'Shipping',
    'Delivered'
);


ALTER TYPE public."ORDER_STATUS" OWNER TO postgres;

--
-- TOC entry 847 (class 1247 OID 125746)
-- Name: ROLE; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."ROLE" AS ENUM (
    'Customer',
    'Admin'
);


ALTER TYPE public."ROLE" OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 217 (class 1259 OID 125766)
-- Name: Book; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Book" (
    id text NOT NULL,
    title text NOT NULL,
    author text NOT NULL,
    price double precision NOT NULL,
    genre text NOT NULL,
    "publicationDate" text NOT NULL,
    "categoryId" text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."Book" OWNER TO postgres;

--
-- TOC entry 216 (class 1259 OID 125759)
-- Name: Category; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Category" (
    id text NOT NULL,
    title text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."Category" OWNER TO postgres;

--
-- TOC entry 221 (class 1259 OID 125846)
-- Name: Credential; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Credential" (
    "userId" text NOT NULL,
    password text NOT NULL,
    email text NOT NULL,
    "accessToken" text,
    "refreshToken" text,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."Credential" OWNER TO postgres;

--
-- TOC entry 220 (class 1259 OID 125828)
-- Name: Order; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Order" (
    id text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    statue public."ORDER_STATUS" DEFAULT 'Pending'::public."ORDER_STATUS" NOT NULL,
    "userId" text NOT NULL
);


ALTER TABLE public."Order" OWNER TO postgres;

--
-- TOC entry 219 (class 1259 OID 125780)
-- Name: OrderedBook; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."OrderedBook" (
    id text NOT NULL,
    "bookId" text NOT NULL,
    quantity integer NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    "orderId" text NOT NULL
);


ALTER TABLE public."OrderedBook" OWNER TO postgres;

--
-- TOC entry 218 (class 1259 OID 125773)
-- Name: ReviewAndRating; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."ReviewAndRating" (
    id text NOT NULL,
    review text NOT NULL,
    rating integer NOT NULL,
    "userId" text NOT NULL,
    "bookId" text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."ReviewAndRating" OWNER TO postgres;

--
-- TOC entry 215 (class 1259 OID 125751)
-- Name: User; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."User" (
    id text NOT NULL,
    name text NOT NULL,
    email text NOT NULL,
    role public."ROLE" DEFAULT 'Customer'::public."ROLE" NOT NULL,
    "contactNo" text NOT NULL,
    address text NOT NULL,
    "profileImg" text,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."User" OWNER TO postgres;

--
-- TOC entry 214 (class 1259 OID 125736)
-- Name: _prisma_migrations; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public._prisma_migrations (
    id character varying(36) NOT NULL,
    checksum character varying(64) NOT NULL,
    finished_at timestamp with time zone,
    migration_name character varying(255) NOT NULL,
    logs text,
    rolled_back_at timestamp with time zone,
    started_at timestamp with time zone DEFAULT now() NOT NULL,
    applied_steps_count integer DEFAULT 0 NOT NULL
);


ALTER TABLE public._prisma_migrations OWNER TO postgres;

--
-- TOC entry 3389 (class 0 OID 125766)
-- Dependencies: 217
-- Data for Name: Book; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."Book" (id, title, author, price, genre, "publicationDate", "categoryId", "createdAt", "updatedAt") VALUES ('cdc4ef0c-7b6d-4b69-86ae-cb3231df0766', 'Python Crash Course', 'Eric Matthes', 24.99, 'Programming', '2015-11-30', '24befe03-e0f5-46e3-a636-c631e4e64d56', '2023-09-17 10:40:59.73', '2023-09-17 10:40:59.73');
INSERT INTO public."Book" (id, title, author, price, genre, "publicationDate", "categoryId", "createdAt", "updatedAt") VALUES ('d183b414-65ef-4546-a0bb-c78a539ac7e3', 'Dune', 'Frank Herbert', 24.99, 'Science Fiction', '1965-06-01', '680a551f-2d7b-428a-b765-b2d3a24d1223', '2023-09-17 10:41:33.266', '2023-09-17 10:41:33.266');


--
-- TOC entry 3388 (class 0 OID 125759)
-- Dependencies: 216
-- Data for Name: Category; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."Category" (id, title, "createdAt", "updatedAt") VALUES ('ae7ffe5d-2731-48e9-ae40-99260c3c62fb', 'Historical', '2023-09-17 10:38:36.235', '2023-09-17 10:38:36.235');
INSERT INTO public."Category" (id, title, "createdAt", "updatedAt") VALUES ('24befe03-e0f5-46e3-a636-c631e4e64d56', 'Programming', '2023-09-17 10:38:46.432', '2023-09-17 10:38:46.432');
INSERT INTO public."Category" (id, title, "createdAt", "updatedAt") VALUES ('680a551f-2d7b-428a-b765-b2d3a24d1223', 'Science Fiction', '2023-09-17 10:38:56.784', '2023-09-17 10:38:56.784');


--
-- TOC entry 3393 (class 0 OID 125846)
-- Dependencies: 221
-- Data for Name: Credential; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."Credential" ("userId", password, email, "accessToken", "refreshToken", "createdAt", "updatedAt") VALUES ('351a7edf-424a-48ef-a196-81c14368f52e', '$2b$15$dtIawLnxKVrZS6AqkaBNI.OiL3JG2FEDze/xQK/FTDO.HsuIeJyri', 'abdul@gmail.com', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjM1MWE3ZWRmLTQyNGEtNDhlZi1hMTk2LTgxYzE0MzY4ZjUyZSIsImVtYWlsIjoiYWJkdWxAZ21haWwuY29tIiwicm9sZSI6IkFkbWluIiwiaWF0IjoxNjk0OTQ3MDk1LCJleHAiOjE2OTUyMDYyOTV9.stRfvIAuhesnpJAsW5IaubOZGCLtteKeGeoEUYCdrwc', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjM1MWE3ZWRmLTQyNGEtNDhlZi1hMTk2LTgxYzE0MzY4ZjUyZSIsImVtYWlsIjoiYWJkdWxAZ21haWwuY29tIiwicm9sZSI6IkFkbWluIiwiaWF0IjoxNjk0OTQ3MDk1LCJleHAiOjE2OTU1NTE4OTV9.2BCzSx2Vmyc9uhyR2qYgtZdKOWhLB4QYqWbZGlnS4Uk', '2023-09-17 10:38:01.373', '2023-09-17 10:38:15.742');
INSERT INTO public."Credential" ("userId", password, email, "accessToken", "refreshToken", "createdAt", "updatedAt") VALUES ('32f37097-b031-4186-acb3-c20e77ef8fb8', '$2b$15$fhSmNXRIUQuGGYjycxkjZ.AOH/YCkxvYHQ.H5N3H5CYub//XvN.sS', 'ali@gmail.com', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjMyZjM3MDk3LWIwMzEtNDE4Ni1hY2IzLWMyMGU3N2VmOGZiOCIsImVtYWlsIjoiYWxpQGdtYWlsLmNvbSIsInJvbGUiOiJDdXN0b21lciIsImlhdCI6MTY5NDk0NzM2NiwiZXhwIjoxNjk1MjA2NTY2fQ.tusEyCUvab349HMK39Bgqol0sx-fW5JADBd7d5q-vNU', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjMyZjM3MDk3LWIwMzEtNDE4Ni1hY2IzLWMyMGU3N2VmOGZiOCIsImVtYWlsIjoiYWxpQGdtYWlsLmNvbSIsInJvbGUiOiJDdXN0b21lciIsImlhdCI6MTY5NDk0NzM2NiwiZXhwIjoxNjk1NTUyMTY2fQ.fD839w7cMpdTN_bhD3eZn8PSpQ0fOWf8IUsoKihKuPY', '2023-09-17 10:36:02.18', '2023-09-17 10:42:46.042');


--
-- TOC entry 3392 (class 0 OID 125828)
-- Dependencies: 220
-- Data for Name: Order; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."Order" (id, "createdAt", "updatedAt", statue, "userId") VALUES ('8896636a-4acf-4df9-bddd-cafa3e546a96', '2023-09-17 10:54:21.1', '2023-09-17 10:54:21.1', 'Pending', '32f37097-b031-4186-acb3-c20e77ef8fb8');


--
-- TOC entry 3391 (class 0 OID 125780)
-- Dependencies: 219
-- Data for Name: OrderedBook; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."OrderedBook" (id, "bookId", quantity, "createdAt", "updatedAt", "orderId") VALUES ('8ae6716e-b203-497b-8b2b-3437a6e08bcd', 'd183b414-65ef-4546-a0bb-c78a539ac7e3', 3, '2023-09-17 10:54:21.1', '2023-09-17 10:54:21.1', '8896636a-4acf-4df9-bddd-cafa3e546a96');
INSERT INTO public."OrderedBook" (id, "bookId", quantity, "createdAt", "updatedAt", "orderId") VALUES ('8e253380-95f2-4a62-878e-39dfce37170b', 'cdc4ef0c-7b6d-4b69-86ae-cb3231df0766', 2, '2023-09-17 10:54:21.1', '2023-09-17 10:54:21.1', '8896636a-4acf-4df9-bddd-cafa3e546a96');


--
-- TOC entry 3390 (class 0 OID 125773)
-- Dependencies: 218
-- Data for Name: ReviewAndRating; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 3387 (class 0 OID 125751)
-- Dependencies: 215
-- Data for Name: User; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."User" (id, name, email, role, "contactNo", address, "profileImg", "createdAt", "updatedAt") VALUES ('32f37097-b031-4186-acb3-c20e77ef8fb8', 'Ali Ahmed', 'ali@gmail.com', 'Customer', '1234567890', 'Dhaka, Bangladesh', 'user.jpg', '2023-09-17 10:36:02.18', '2023-09-17 10:36:02.18');
INSERT INTO public."User" (id, name, email, role, "contactNo", address, "profileImg", "createdAt", "updatedAt") VALUES ('351a7edf-424a-48ef-a196-81c14368f52e', 'Abdul Jabbar', 'abdul@gmail.com', 'Admin', '1234567890', 'Dhaka, Bangladesh', 'user.jpg', '2023-09-17 10:38:01.373', '2023-09-17 10:38:01.373');


--
-- TOC entry 3386 (class 0 OID 125736)
-- Dependencies: 214
-- Data for Name: _prisma_migrations; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) VALUES ('c63ced72-254d-4c70-bf54-f0aca918aaef', '7500f558629a18c76817932288abc78bb7cff45bc42c7b56c401b71243a55c71', '2023-09-17 16:03:47.0177+06', '20230915125732_', NULL, NULL, '2023-09-17 16:03:46.907253+06', 1);
INSERT INTO public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) VALUES ('57b068aa-bdfa-4050-bfb7-be94f3842e0b', '50921f98059dd48b45eeaf1008d14d5898ce8f996c05588661c5dd59d2c389e7', '2023-09-17 16:03:47.027235+06', '20230915165835_', NULL, NULL, '2023-09-17 16:03:47.018251+06', 1);
INSERT INTO public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) VALUES ('5e91a26e-b535-41cd-82e1-ce07cba9f87e', 'cedf5331ac98556ad3a5bc7599fd4489cb2e42b3d8c5d5721789e58585cf8a35', '2023-09-17 16:03:47.064433+06', '20230915165933_', NULL, NULL, '2023-09-17 16:03:47.029177+06', 1);
INSERT INTO public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) VALUES ('697a2f1c-4944-4095-8704-342133bdaed2', '475049adb6488c1cbf8c462553e802a81841d8ae63d2b004a0231ad88810b930', '2023-09-17 16:03:47.086381+06', '20230916055510_', NULL, NULL, '2023-09-17 16:03:47.064963+06', 1);
INSERT INTO public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) VALUES ('bdaef3c3-3aa8-4855-9a5e-ae18b7009164', '84639a346008bc539021de8a54c23db2db49995efa26f5691b074a8ab3b138ba', '2023-09-17 16:03:47.095262+06', '20230916101759_', NULL, NULL, '2023-09-17 16:03:47.086906+06', 1);
INSERT INTO public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) VALUES ('fce310f3-0c97-4358-a175-8ed935b2a40b', 'd9060a83ec59f5c406d381ef130cb918b5177e3b894bb0c967a27a691d6c0455', '2023-09-17 16:03:47.102001+06', '20230916132521_', NULL, NULL, '2023-09-17 16:03:47.097122+06', 1);
INSERT INTO public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) VALUES ('db2c3fc2-fc47-4636-9542-2c5d3fc40885', 'fdadd8c1ac41daf3cf02b88d63b87a3461ec3571d90c4bd270e9f907d3a79bd5', '2023-09-17 16:03:47.106398+06', '20230917043437_', NULL, NULL, '2023-09-17 16:03:47.102626+06', 1);
INSERT INTO public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) VALUES ('0eae239c-becc-4c96-b736-70c3e36374da', '7ae520df1205d3d607689a35af58d5bad49555eec3d4318ab94213ecd36a9418', '2023-09-17 16:03:47.109297+06', '20230917050812_', NULL, NULL, '2023-09-17 16:03:47.106929+06', 1);
INSERT INTO public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) VALUES ('6136afba-654c-43be-a4a9-e2507459fbae', '5aabc0223d53b6d5dd9e2bddb37d9be7b411d150f5fe33ef712915ec95ec31ba', '2023-09-17 16:03:47.112847+06', '20230917083324_', NULL, NULL, '2023-09-17 16:03:47.109641+06', 1);
INSERT INTO public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) VALUES ('29a15d35-a7fd-4974-b597-29cbc4da9ebb', 'd67bc76795ef24eb7925cf4bb7bb0af1289e93e847fd073d1a1d0c5fe2116e4c', '2023-09-17 16:03:47.115929+06', '20230917092333_', NULL, NULL, '2023-09-17 16:03:47.113181+06', 1);
INSERT INTO public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) VALUES ('c838d376-bfc4-443e-a528-751f839b92eb', '8f68d917ff08bee9b8d4ff7f40fb0e17ee0af1028aa38c7c3efb624cdd6283fd', '2023-09-17 16:03:47.123456+06', '20230917094801_', NULL, NULL, '2023-09-17 16:03:47.117731+06', 1);
INSERT INTO public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) VALUES ('fda22814-9171-4562-8f64-d78a7ac3b6b6', 'f93f052a8da3b0d6860c38a6d1fceeee231843a71353e46b809b76248150c660', '2023-09-17 16:03:59.485354+06', '20230917100359_', NULL, NULL, '2023-09-17 16:03:59.473971+06', 1);
INSERT INTO public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) VALUES ('9d423d9b-9d13-4b6e-9cfa-bd6acfe776db', 'd4821fcbbaed30e473f9f53db9da30fd010375c1f5584b556e1f4d5a4e08aa4d', '2023-09-17 16:26:50.660056+06', '20230917102650_', NULL, NULL, '2023-09-17 16:26:50.653891+06', 1);


--
-- TOC entry 3226 (class 2606 OID 125772)
-- Name: Book Book_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Book"
    ADD CONSTRAINT "Book_pkey" PRIMARY KEY (id);


--
-- TOC entry 3223 (class 2606 OID 125765)
-- Name: Category Category_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Category"
    ADD CONSTRAINT "Category_pkey" PRIMARY KEY (id);


--
-- TOC entry 3235 (class 2606 OID 125852)
-- Name: Credential Credential_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Credential"
    ADD CONSTRAINT "Credential_pkey" PRIMARY KEY ("userId");


--
-- TOC entry 3232 (class 2606 OID 125834)
-- Name: Order Order_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Order"
    ADD CONSTRAINT "Order_pkey" PRIMARY KEY (id);


--
-- TOC entry 3230 (class 2606 OID 125786)
-- Name: OrderedBook OrderedBook_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."OrderedBook"
    ADD CONSTRAINT "OrderedBook_pkey" PRIMARY KEY (id);


--
-- TOC entry 3228 (class 2606 OID 125779)
-- Name: ReviewAndRating ReviewAndRating_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ReviewAndRating"
    ADD CONSTRAINT "ReviewAndRating_pkey" PRIMARY KEY (id);


--
-- TOC entry 3221 (class 2606 OID 125758)
-- Name: User User_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "User_pkey" PRIMARY KEY (id);


--
-- TOC entry 3218 (class 2606 OID 125744)
-- Name: _prisma_migrations _prisma_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public._prisma_migrations
    ADD CONSTRAINT _prisma_migrations_pkey PRIMARY KEY (id);


--
-- TOC entry 3224 (class 1259 OID 125795)
-- Name: Category_title_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "Category_title_key" ON public."Category" USING btree (title);


--
-- TOC entry 3233 (class 1259 OID 125859)
-- Name: Credential_email_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "Credential_email_key" ON public."Credential" USING btree (email);


--
-- TOC entry 3236 (class 1259 OID 125853)
-- Name: Credential_userId_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "Credential_userId_key" ON public."Credential" USING btree ("userId");


--
-- TOC entry 3219 (class 1259 OID 125794)
-- Name: User_email_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "User_email_key" ON public."User" USING btree (email);


--
-- TOC entry 3237 (class 2606 OID 125797)
-- Name: Book Book_categoryId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Book"
    ADD CONSTRAINT "Book_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES public."Category"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 3243 (class 2606 OID 125854)
-- Name: Credential Credential_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Credential"
    ADD CONSTRAINT "Credential_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 3242 (class 2606 OID 125880)
-- Name: Order Order_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Order"
    ADD CONSTRAINT "Order_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 3240 (class 2606 OID 125817)
-- Name: OrderedBook OrderedBook_bookId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."OrderedBook"
    ADD CONSTRAINT "OrderedBook_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES public."Book"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 3241 (class 2606 OID 127177)
-- Name: OrderedBook OrderedBook_orderId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."OrderedBook"
    ADD CONSTRAINT "OrderedBook_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES public."Order"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 3238 (class 2606 OID 125807)
-- Name: ReviewAndRating ReviewAndRating_bookId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ReviewAndRating"
    ADD CONSTRAINT "ReviewAndRating_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES public."Book"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 3239 (class 2606 OID 125802)
-- Name: ReviewAndRating ReviewAndRating_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ReviewAndRating"
    ADD CONSTRAINT "ReviewAndRating_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 3400 (class 0 OID 0)
-- Dependencies: 5
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: postgres
--

REVOKE USAGE ON SCHEMA public FROM PUBLIC;


-- Completed on 2023-09-17 17:09:59

--
-- PostgreSQL database dump complete
--

