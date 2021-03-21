using Microsoft.EntityFrameworkCore.Migrations;

namespace ChessComboCMS.Migrations
{
    public partial class create_combo_view : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql("CREATE VIEW comboview AS\n  SELECT \n  c.\"Id\", \n  c.\"GameId\", \n  c.\"Description\", \n  c.\"Moves\", \n  g.\"Date\", \n  g.\"Description\" as \"GameDescription\", \n  p1.\"FirstName\" as \"PlayerFirstName\", \n  p1.\"LastName\" as \"PlayerLastName\",\n  p1.\"Id\" as \"PlayerId\",\n  p2.\"FirstName\" as \"WhitePlayerFirstName\",\n  p2.\"LastName\" as \"WhitePlayerLastName\",\n  p2.\"Id\" as \"WhitePlayerId\",\n  p3.\"FirstName\" as \"BlackPlayerFirstName\",\n  p3.\"LastName\" as \"BlackPlayerLastName\",\n  p3.\"Id\" as \"BlackPlayerId\"\n  FROM public.\"Combinations\" c \n  left join public.\"Games\" g on c.\"GameId\" = g.\"Id\"\n  left join public.\"Players\" p1 on c.\"PlayerId\" = p1.\"Id\"\n  left join public.\"Players\" p2 on g.\"WhitePlayerId\" = p2.\"Id\"\n  left join public.\"Players\" p3 on g.\"BlackPlayerId\" = p3.\"Id\"");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql("DROP VIEW comboview");
        }
    }
}
