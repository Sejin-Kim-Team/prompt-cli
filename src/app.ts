import 'module-alias/register'
import '@/plugins/dotenv'
import { ChatGPTBuilder } from '@/ChatGPT/ChatGPT'
import { OPENAI_API_KEY } from '@/constant/app.constant'

async function run() {
  const chatGPT = new ChatGPTBuilder(OPENAI_API_KEY!).build()

  const response = await chatGPT.chat(['Hello', 'Hi', 'How are you?'])

  console.log(response)
}

run()
