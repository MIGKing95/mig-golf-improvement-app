export async function POST(request: Request) {
  const { question } = await request.json();
  return Response.json({
    answer: `MIG Coach says: focus on the root miss, keep the drill simple, and track the next practice session. Question received: ${question}`
  });
}
