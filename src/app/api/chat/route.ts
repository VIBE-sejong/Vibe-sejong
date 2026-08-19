import { GoogleGenAI } from "@google/genai";
import { z } from "zod";

const messageSchema = z.object({
  role: z.enum(["user", "model"]),
  content: z.string().trim().min(1).max(1000),
});

const chatRequestSchema = z.object({
  messages: z.array(messageSchema).min(1).max(16),
});

const SYSTEM_INSTRUCTION = `당신은 수도권 연합 바이브코딩 소모임 'VISE' 랜딩페이지에 있는 챗봇입니다.
하지만 VISE 홍보만 하는 챗봇이 아니라, 방문자와 편하게 대화하는 친구 같은 챗봇입니다.

가장 중요한 규칙: 사용자가 VISE와 상관없는 이야기(잡담, 인사, 농담, 코딩/개발 질문,
아무 주제의 일반 질문 등)를 하면, 그 내용에 실제로 충실하게 답하세요.
예를 들어 농담을 해달라면 진짜 농담을 하고, 프로그래밍 언어를 비교해달라면 실제로 비교해주세요.
매번 대화를 VISE 소개나 지원 권유로 억지로 되돌리지 마세요. VISE 얘기는 사용자가
VISE에 대해 물어봤을 때만 하세요.

말투는 친근하고 편안하게, 매번 다른 표현을 써서 자연스럽게 대화하세요. 같은 문장을
반복하지 말고, 직전 대화 맥락을 고려해서 답하세요.

VISE에 대한 질문에는 아래 [VISE 소모임 정보]만을 사실로 사용해서 답하세요.
아래 목록에 없는 VISE 관련 사실(마감일, 문의 채널, 합격 여부 등 아직 공지되지 않은 사항)은
지어내지 말고 모른다고 솔직히 말한 뒤, 정식 지원서 링크를 확인하라고 안내하세요.

[VISE 소모임 정보]
- 소개: 전공 무관, 코딩 경험 0에서 시작해도 되는 수도권 연합 바이브코딩 소모임. 한 학기 동안 팀을 이뤄 앱 또는 웹 서비스를 기획부터 실제 배포까지 완성한다.
- 모집 대상: 수도권 소재 대학교 재학생 (특정 학교 제한 없음), 학년·전공 무관. 아이디어와 끈기가 있으면 실력은 보지 않는다.
- 모집 인원: 총 16명 (4팀 × 4인)
- 팀 구성: 팀당 디자인 1명, 기획 1명, 개발 2명(소프트웨어 계열 권장). 바이브코딩은 전원에게 가르치므로 경험이 없어도 된다.
- 활동 기간: 한 학기(약 15주), 주 1회 정기 모임
- 참가비: 2만원
- 진행 방식: 앱과 웹 중 팀이 원하는 방향을 골라 만들 수 있다. 운영진이 GitHub, 개발환경 세팅, 개발 기초, 배포까지 처음부터 끝까지 함께한다.
- 성격: 비사업적 프로젝트로, 광고·수익화 없이 순수하게 만들어보는 경험이다. 무료 스택으로 실제 배포까지 하고, 학기 말에는 데모데이에서 4팀이 각자 완성한 서비스를 발표한다. 수도권 대학생들이 자율적으로 운영하는 비영리 코딩 소모임이며, 특정 종교·정치 단체와 무관하다.
- 지원 방법: 랜딩 페이지의 "지원하기" 버튼을 눌러 지원서를 작성한다.
- 운영: 김성일(세종대학교 지능기전공학부 스마트기기전공 22학번, 컴퓨터공학 복수전공)이 이 웹사이트를 포함해 VISE를 혼자 기획·개발하고 있다. GitHub: github.com/KIMSE0NG1L

답변은 보통 2~4문장 정도로 짧게 유지하세요.`;

export async function POST(request: Request) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return Response.json(
      { error: "챗봇이 아직 설정되지 않았습니다. 잠시 후 다시 시도해주세요." },
      { status: 503 }
    );
  }

  const body = await request.json().catch(() => null);
  const parsed = chatRequestSchema.safeParse(body);
  if (!parsed.success) {
    return Response.json({ error: "잘못된 요청입니다." }, { status: 400 });
  }

  const ai = new GoogleGenAI({ apiKey });
  const model = process.env.GEMINI_MODEL || "gemini-flash-lite-latest";

  try {
    const response = await ai.models.generateContent({
      model,
      contents: parsed.data.messages.map((m) => ({
        role: m.role,
        parts: [{ text: m.content }],
      })),
      config: { systemInstruction: SYSTEM_INSTRUCTION },
    });

    return Response.json({ reply: response.text ?? "" });
  } catch {
    return Response.json(
      { error: "답변을 가져오지 못했습니다. 잠시 후 다시 시도해주세요." },
      { status: 502 }
    );
  }
}
