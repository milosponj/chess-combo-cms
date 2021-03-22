﻿// <auto-generated />
using System;
using ChessComboCMS.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

namespace ChessComboCMS.Migrations
{
    [DbContext(typeof(ChessComboCMSContext))]
    [Migration("20210307104219_players_can_be_null_in_games")]
    partial class players_can_be_null_in_games
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("Relational:MaxIdentifierLength", 63)
                .HasAnnotation("ProductVersion", "5.0.3")
                .HasAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

            modelBuilder.Entity("ChessComboAdminCMS.Domain.Game", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .HasAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

                    b.Property<int?>("BlackPlayerId")
                        .HasColumnType("integer");

                    b.Property<DateTimeOffset>("Date")
                        .HasColumnType("timestamp with time zone");

                    b.Property<bool>("IsWhite")
                        .HasColumnType("boolean");

                    b.Property<string>("PGN")
                        .HasColumnType("text");

                    b.Property<int?>("WhitePlayerId")
                        .HasColumnType("integer");

                    b.HasKey("Id");

                    b.HasIndex("BlackPlayerId");

                    b.HasIndex("WhitePlayerId");

                    b.ToTable("Games");
                });

            modelBuilder.Entity("ChessComboAdminCMS.Domain.Player", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .HasAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

                    b.Property<DateTimeOffset>("DateOfBirth")
                        .HasColumnType("timestamp with time zone");

                    b.Property<string>("FirstName")
                        .HasColumnType("text");

                    b.Property<string>("LastName")
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.ToTable("Players");
                });

            modelBuilder.Entity("ChessComboAdminCMS.Domain.Game", b =>
                {
                    b.HasOne("ChessComboAdminCMS.Domain.Player", "BlackPlayer")
                        .WithMany()
                        .HasForeignKey("BlackPlayerId");

                    b.HasOne("ChessComboAdminCMS.Domain.Player", "WhitePlayer")
                        .WithMany()
                        .HasForeignKey("WhitePlayerId");

                    b.Navigation("BlackPlayer");

                    b.Navigation("WhitePlayer");
                });
#pragma warning restore 612, 618
        }
    }
}