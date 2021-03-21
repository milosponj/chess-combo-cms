using Microsoft.EntityFrameworkCore.Migrations;

namespace ChessComboCMS.Migrations
{
    public partial class players_can_be_null_in_games : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Games_Players_BlackPlayerId",
                table: "Games");

            migrationBuilder.DropForeignKey(
                name: "FK_Games_Players_WhitePlayerId",
                table: "Games");

            migrationBuilder.AlterColumn<int>(
                name: "WhitePlayerId",
                table: "Games",
                type: "integer",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "integer");

            migrationBuilder.AlterColumn<int>(
                name: "BlackPlayerId",
                table: "Games",
                type: "integer",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "integer");

            migrationBuilder.AddForeignKey(
                name: "FK_Games_Players_BlackPlayerId",
                table: "Games",
                column: "BlackPlayerId",
                principalTable: "Players",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Games_Players_WhitePlayerId",
                table: "Games",
                column: "WhitePlayerId",
                principalTable: "Players",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Games_Players_BlackPlayerId",
                table: "Games");

            migrationBuilder.DropForeignKey(
                name: "FK_Games_Players_WhitePlayerId",
                table: "Games");

            migrationBuilder.AlterColumn<int>(
                name: "WhitePlayerId",
                table: "Games",
                type: "integer",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "integer",
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "BlackPlayerId",
                table: "Games",
                type: "integer",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "integer",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Games_Players_BlackPlayerId",
                table: "Games",
                column: "BlackPlayerId",
                principalTable: "Players",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Games_Players_WhitePlayerId",
                table: "Games",
                column: "WhitePlayerId",
                principalTable: "Players",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
