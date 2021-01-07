using System;
using System.Runtime.Serialization;

namespace Api.Email
{
    [Serializable]
    public class EmailMessageSendingDisabledException : Exception
    {
        public EmailMessageSendingDisabledException()
        { }

        protected EmailMessageSendingDisabledException(SerializationInfo info, StreamingContext context) : base(info, context) { }
    }
}