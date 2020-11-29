using System;

namespace Api.LockInQuote
{
    [Serializable]
    public class QuoteReceivedMessengerException : Exception
    {
        public static QuoteReceivedMessengerException SendingFailed() =>
            new QuoteReceivedMessengerException("Failed to send quote received message.");

        public QuoteReceivedMessengerException(string message) : base(message) { }
        protected QuoteReceivedMessengerException(
            System.Runtime.Serialization.SerializationInfo info,
            System.Runtime.Serialization.StreamingContext context) : base(info, context) { }
    }
}
