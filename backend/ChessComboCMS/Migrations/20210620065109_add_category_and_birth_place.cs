using Microsoft.EntityFrameworkCore.Migrations;

namespace ChessComboCMS.Migrations
{
    public partial class add_category_and_birth_place : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "PlaceOfBirth",
                table: "Players",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Category",
                table: "Combinations",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "PlaceOfBirth",
                table: "Players");

            migrationBuilder.DropColumn(
                name: "Category",
                table: "Combinations");
        }
    }
}
