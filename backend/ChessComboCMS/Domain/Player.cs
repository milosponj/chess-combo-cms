using System;
using System.ComponentModel.DataAnnotations.Schema;


namespace ChessComboCMS.Domain
{
    public class Player
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public DateTimeOffset? DateOfBirth { get; set; }
        public string PlaceOfBirth { get; set; }
        [NotMapped]
        public string FullName => $"{FirstName} {LastName}";
    }
}
