import { ChatCompletionRequestMessageRoleEnum, Configuration, OpenAIApi } from 'openai'

export class ChatGPT {
  private openai: OpenAIApi
  private model: string
  private role: ChatCompletionRequestMessageRoleEnum

  constructor(builder: ChatGPTBuilder) {
    this.openai = new OpenAIApi(builder.configuration)
    this.model = builder.model
    this.role = builder.role
  }

  public async chat(messages: string[]): Promise<string[]> {
    const { data } = await this.openai.createChatCompletion({
      model: this.model,
      messages: messages.map(message => ({ role: this.role, content: message })),
    })

    const result = data.choices.map(choice => choice?.message?.content).filter(x => x)

    return result as string[]
  }
}

export class ChatGPTBuilder {
  apiKey: string
  model = 'gpt-3.5-turbo'
  role: ChatCompletionRequestMessageRoleEnum = ChatCompletionRequestMessageRoleEnum.User
  constructor(apiKey: string) {
    this.apiKey = apiKey
  }

  withModel(model: string) {
    this.model = model
    return this
  }

  withRole(role: ChatCompletionRequestMessageRoleEnum) {
    this.role = role
    return this
  }

  get configuration() {
    return new Configuration({
      apiKey: this.apiKey,
    })
  }

  build() {
    return new ChatGPT(this)
  }
}
