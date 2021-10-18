import React from "react";
import { Chessboard } from "cm-chessboard";
import { useEffect, useState } from "react";
import ChessPieces from "../assets/chessboard-sprite-staunty.svg";
import "../../node_modules/cm-chessboard/assets/styles/cm-chessboard.css";

export function ChessboardComponent() {
  const fen = "2r3k1/5p2/4N2b/2p3p1/1p1p4/1P5P/qB3PP1/5RK1 w - - 0 35";
  console.log(ChessPieces, "AXCZDS");
  const [chessBoard, setChessBoard] = useState<any>(null);
  useEffect(() => {
    if (!chessBoard) {
      setChessBoard(
        new Chessboard(document.getElementById(`combination-`), {
          position: fen,
          responsive: true,
          style: {
            aspectRatio: 0.9,
            showCoordinates: false,
            borderType: "thin",
          },
          sprite: {
            url: ChessPieces,
            grid: 40,
          },
        })
      );
    } else {
      chessBoard.setPosition(fen);
    }
  }, [chessBoard, fen]);
  console.log(chessBoard);
  return (
    <div id={`combination-`}>
      <p>HEEEELLLOO</p>
    </div>
  );
}
