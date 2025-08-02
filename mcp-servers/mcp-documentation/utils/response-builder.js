// Response builder utility for MCP Documentation Server
export function buildResourceResponse(uri, content, mimeType = 'text/markdown') {
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

export function buildErrorResponse(error, uri) {
  return {
    contents: [
      {
        uri,
        mimeType: 'text/plain',
        text: `Error loading resource: ${error.message}`
      }
    ]
  };
}