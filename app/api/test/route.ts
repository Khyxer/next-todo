import { neon } from '@neondatabase/serverless'

export async function GET() {
  try {
    const sql = neon(process.env.DATABASE_URL!)
    
    const result = await sql`SELECT NOW() as current_time`
    
    return Response.json({ 
      success: true, 
      time: result[0].current_time 
    })
  } catch (error) {
    return Response.json({ 
      success: false, 
      error: (error as Error).message 
    }, { status: 500 })
  }
}