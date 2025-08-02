export class ResponseBuilder {
  static buildResourceResponse(uri, content, mimeType = "text/plain") {
    return {
      contents: [
        {
          uri,
          mimeType,
          text: content
        }
      ]
    };
  }

  static buildResourceList(resources) {
    return {
      resources: resources.map(resource => ({
        uri: resource.uri,
        mimeType: resource.mimeType,
        name: resource.name,
        description: resource.description
      }))
    };
  }

  static buildPromptResponse(description, messages) {
    return {
      description,
      messages
    };
  }

  static buildPromptList(prompts) {
    return {
      prompts: prompts.map(prompt => ({
        name: prompt.name,
        description: prompt.description,
        arguments: prompt.arguments || []
      }))
    };
  }
}