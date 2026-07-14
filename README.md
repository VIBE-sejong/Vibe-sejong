# VISE

세종대 바이브코딩 동아리(1기) 동아리원 사이트. 학번+이름으로 로그인해서
주차별 커리큘럼을 확인하고, 팀별 주차 활동(텍스트+이미지)을 업로드/열람하고,
마이페이지(프로필 사진+자기소개)와 팀 페이지(팀 소개+내부 게시판)를 관리합니다.
로그인 없이 볼 수 있는 홍보용 소개 페이지는 `/`에 있습니다.

## 스택

Next.js(App Router, TypeScript) · Supabase(Postgres + Storage) · Tailwind CSS +
shadcn/ui · Vercel 배포. 인증은 Supabase Auth가 아닌 커스텀 방식(학번+이름 대조
후 서명된 세션 쿠키 발급)이며, 서버는 Supabase를 service role key로만 접근합니다.

## Supabase 설정

1. [supabase.com](https://supabase.com)에서 새 프로젝트 생성.
2. SQL Editor에서 `supabase/sql` 아래 파일을 번호 순서대로 실행:
   `001_schema.sql` → `002_rls_deny_all.sql` → `003_storage.sql` →
   `005_remove_marketing_part.sql` → `006_teams_and_profiles.sql` →
   `007_teams_rls_deny_all.sql` → `008_profile_images_storage.sql`.
   (`004_bootstrap_admin.example.sql`은 3번 단계에서 별도로 실행)
3. 최초 관리자 1명을 SQL로 직접 등록 (이후엔 `/admin/members`에서 웹 UI로 관리):
   `supabase/sql/004_bootstrap_admin.example.sql`을 참고해 학번/이름/팀/파트를
   본인 정보로 바꿔서 SQL Editor에서 실행.
4. Project Settings > API에서 Project URL과 `service_role` 키를 확인.

## 로컬 실행

```bash
cp .env.local.example .env.local
# .env.local에 NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY,
# SESSION_SECRET(openssl rand -base64 32 등으로 생성) 채우기

npm install
npm run dev
```

`http://localhost:3000` 접속 → 부트스트랩 admin 계정으로 로그인 →
`/admin/members`에서 나머지 15명 등록 → `/admin/weeks`에서 1주차 커리큘럼 작성.

## Vercel 배포

Vercel에 프로젝트를 연결한 뒤 `NEXT_PUBLIC_SUPABASE_URL`,
`SUPABASE_SERVICE_ROLE_KEY`, `SESSION_SECRET`을 Production/Preview 환경변수로
등록하면 됩니다. `SUPABASE_SERVICE_ROLE_KEY`는 절대 `NEXT_PUBLIC_` 접두어를
붙이지 않습니다 (클라이언트 번들에 노출되는 것 방지).
