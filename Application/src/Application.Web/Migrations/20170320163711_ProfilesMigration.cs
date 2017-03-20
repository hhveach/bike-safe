using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Application.Web.Migrations
{
    public partial class ProfilesMigration : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "BikeId",
                table: "Users",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Image",
                table: "Users",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Name",
                table: "Users",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "Bike",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Image = table.Column<string>(nullable: true),
                    Make = table.Column<string>(nullable: true),
                    Model = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Bike", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Users_BikeId",
                table: "Users",
                column: "BikeId");

            migrationBuilder.AddForeignKey(
                name: "FK_Users_Bike_BikeId",
                table: "Users",
                column: "BikeId",
                principalTable: "Bike",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Users_Bike_BikeId",
                table: "Users");

            migrationBuilder.DropTable(
                name: "Bike");

            migrationBuilder.DropIndex(
                name: "IX_Users_BikeId",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "BikeId",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "Image",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "Name",
                table: "Users");
        }
    }
}
