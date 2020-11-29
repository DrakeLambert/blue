namespace Api.LockInQuote
{
    public class Request
    {
        public ContactInformationRequest ContactInformation { get; set; }

        public QuoteInformationRequest QuoteInformation { get; set; }

        public class QuoteInformationRequest
        {
            public string Description { get; set; }
            public decimal Total { get; set; }
            public BathroomDetails RoomDetails { get; set; }
        }

        public class ContactInformationRequest
        {
            public string FirstName { get; set; }
            public string LastName { get; set; }
            public string Address1 { get; set; }
            public string Address2 { get; set; }
            public string City { get; set; }
            public string State { get; set; }
            public string Zip { get; set; }
            public string PhoneNumber { get; set; }
        }
    }

    public abstract class RoomDetails
    {
        public string RoomType { get; set; }
    }

    public class BathroomDetails : RoomDetails
    {
        public int SquareFootage { get; set; }
        public int VanityCount { get; set; }
    }
}
