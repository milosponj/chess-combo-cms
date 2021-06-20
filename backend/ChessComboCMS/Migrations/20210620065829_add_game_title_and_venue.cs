using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace ChessComboCMS.Migrations
{
    public partial class add_game_title_and_venue : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<DateTimeOffset>(
                name: "Date",
                table: "Games",
                nullable: true,
                oldClrType: typeof(DateTimeOffset),
                oldType: "timestamp with time zone");

            migrationBuilder.AddColumn<string>(
                name: "Title",
                table: "Games",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Venue",
                table: "Games",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Title",
                table: "Games");

            migrationBuilder.DropColumn(
                name: "Venue",
                table: "Games");

            migrationBuilder.AlterColumn<DateTimeOffset>(
                name: "Date",
                table: "Games",
                type: "timestamp with time zone",
                nullable: false,
                oldClrType: typeof(DateTimeOffset),
                oldNullable: true);
        }
    }
}
