import React from "react";
import { Chessboard } from "cm-chessboard";
import { useEffect, useState } from "react";
import ChessPieces from "../assets/chessboard-sprite-staunty.svg";
import "../../node_modules/cm-chessboard/assets/styles/cm-chessboard.css";

interface Props {
  fen: string;
  id: string;
}

export const ChessboardComponent: React.FC<Props> = ({ fen, id }: Props) => {
  const [chessBoard, setChessBoard] = useState<any>(null);
  useEffect(() => {
    if (!chessBoard) {
      setChessBoard(
        new Chessboard(document.getElementById(`chessboard-${id}`), {
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
  }, [chessBoard, fen, id]);

  return <div id={`chessboard-${id}`}></div>;
};
