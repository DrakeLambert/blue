using System.IO;
using System.Net.Mime;

namespace Api.Email
{
    public class EmailAttachment
    {
        public EmailAttachment(string fileName, ContentType contentType, Stream content)
        {
            if (string.IsNullOrWhiteSpace(fileName))
            {
                throw new System.ArgumentException($"'{nameof(fileName)}' cannot be null or whitespace", nameof(fileName));
            }

            FileName = fileName;
            ContentType = contentType ?? throw new System.ArgumentNullException(nameof(contentType));
            Content = content ?? throw new System.ArgumentNullException(nameof(content));
        }

        public string FileName { get; set; }

        public ContentType ContentType { get; set; }

        public Stream Content { get; set; }
    }
}