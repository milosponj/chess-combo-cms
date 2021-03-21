using System.Collections.Generic;
using ChessComboCMS.Domain;
using Microsoft.EntityFrameworkCore.Migrations;

namespace ChessComboCMS.Migrations
{
    public partial class update_combination_entity : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsWhite",
                table: "Combinations");

            migrationBuilder.DropColumn(
                name: "MoveFens",
                table: "Combinations");

            migrationBuilder.AddColumn<string>(
                name: "Description",
                table: "Combinations",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<List<Move>>(
                name: "Moves",
                table: "Combinations",
                type: "jsonb",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "PlayerId",
                table: "Combinations",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Combinations_PlayerId",
                table: "Combinations",
                column: "PlayerId");

            migrationBuilder.AddForeignKey(
                name: "FK_Combinations_Players_PlayerId",
                table: "Combinations",
                column: "PlayerId",
                principalTable: "Players",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Combinations_Players_PlayerId",
                table: "Combinations");

            migrationBuilder.DropIndex(
                name: "IX_Combinations_PlayerId",
                table: "Combinations");

            migrationBuilder.DropColumn(
                name: "Description",
                table: "Combinations");

            migrationBuilder.DropColumn(
                name: "Moves",
                table: "Combinations");

            migrationBuilder.DropColumn(
                name: "PlayerId",
                table: "Combinations");

            migrationBuilder.AddColumn<bool>(
                name: "IsWhite",
                table: "Combinations",
                type: "boolean",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<string[]>(
                name: "MoveFens",
                table: "Combinations",
                type: "text[]",
                nullable: true);
        }
    }
}
