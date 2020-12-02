using System;

namespace Api.LockInQuote
{
    [Serializable]
    public class QuoteReceivedMessengerException : Exception
    {
        public static QuoteReceivedMessengerException SendingFailed(Exception innerException) =>
            new QuoteReceivedMessengerException("Failed to send quote received message.", innerException);

        public QuoteReceivedMessengerException(string message, Exception innerException) : base(message, innerException) { }
        protected QuoteReceivedMessengerException(
            System.Runtime.Serialization.SerializationInfo info,
            System.Runtime.Serialization.StreamingContext context) : base(info, context) { }
    }
}
