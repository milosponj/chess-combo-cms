﻿// <auto-generated />
using System;
using System.Collections.Generic;
using ChessComboCMS.Data;
using ChessComboCMS.Domain;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

namespace ChessComboCMS.Migrations
{
    [DbContext(typeof(ChessComboCMSContext))]
    partial class ChessComboCMSContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn)
                .HasAnnotation("ProductVersion", "3.1.13")
                .HasAnnotation("Relational:MaxIdentifierLength", 63);

            modelBuilder.Entity("ChessComboCMS.Domain.Combination", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .HasAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

                    b.Property<string>("Category")
                        .HasColumnType("text");

                    b.Property<string>("Description")
                        .HasColumnType("text");

                    b.Property<int>("GameId")
                        .HasColumnType("integer");

                    b.Property<List<Move>>("Moves")
                        .HasColumnType("jsonb");

                    b.Property<int>("PlayerId")
                        .HasColumnType("integer");

                    b.HasKey("Id");

                    b.HasIndex("GameId");

                    b.HasIndex("PlayerId");

                    b.ToTable("Combinations");
                });

            modelBuilder.Entity("ChessComboCMS.Domain.Game", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .HasAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

                    b.Property<int?>("BlackPlayerId")
                        .HasColumnType("integer");

                    b.Property<string>("ChessBaseUrl")
                        .HasColumnType("text");

                    b.Property<DateTimeOffset?>("Date")
                        .HasColumnType("timestamp with time zone");

                    b.Property<string>("Description")
                        .HasColumnType("text");

                    b.Property<string>("PGN")
                        .HasColumnType("text");

                    b.Property<string>("Title")
                        .HasColumnType("text");

                    b.Property<string>("Venue")
                        .HasColumnType("text");

                    b.Property<int?>("WhitePlayerId")
                        .HasColumnType("integer");

                    b.HasKey("Id");

                    b.HasIndex("BlackPlayerId");

                    b.HasIndex("WhitePlayerId");

                    b.ToTable("Games");
                });

            modelBuilder.Entity("ChessComboCMS.Domain.Player", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .HasAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

                    b.Property<DateTimeOffset?>("DateOfBirth")
                        .HasColumnType("timestamp with time zone");

                    b.Property<string>("FirstName")
                        .HasColumnType("text");

                    b.Property<string>("LastName")
                        .HasColumnType("text");

                    b.Property<string>("PlaceOfBirth")
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.ToTable("Players");
                });

            modelBuilder.Entity("ChessComboCMS.Domain.Combination", b =>
                {
                    b.HasOne("ChessComboCMS.Domain.Game", "Game")
                        .WithMany()
                        .HasForeignKey("GameId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("ChessComboCMS.Domain.Player", "Player")
                        .WithMany()
                        .HasForeignKey("PlayerId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("ChessComboCMS.Domain.Game", b =>
                {
                    b.HasOne("ChessComboCMS.Domain.Player", "BlackPlayer")
                        .WithMany()
                        .HasForeignKey("BlackPlayerId");

                    b.HasOne("ChessComboCMS.Domain.Player", "WhitePlayer")
                        .WithMany()
                        .HasForeignKey("WhitePlayerId");
                });
#pragma warning restore 612, 618
        }
    }
}
