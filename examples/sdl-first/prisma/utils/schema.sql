CREATE TABLE "public"."User" (
  id SERIAL PRIMARY KEY NOT NULL,
  username VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  "createdAt" TIMESTAMP NOT NULL DEFAULT now()
);

CREATE TABLE "public"."Class" (
  id SERIAL PRIMARY KEY NOT NULL,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  "createdAt" TIMESTAMP NOT NULL DEFAULT now()
);

CREATE TABLE "public"."Enrollment" (
	id SERIAL PRIMARY KEY NOT NULL,
	"studentId" INTEGER NOT NULL,
	"classId" INTEGER NOT NULL,
	FOREIGN KEY ("studentId") REFERENCES "public"."User"(id),
	FOREIGN KEY ("classId") REFERENCES "public"."Class"(id),
	"createdAt" TIMESTAMP NOT NULL DEFAULT now()
);
