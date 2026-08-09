import { GameShell, GameTopbar } from "@freegamestore/games";
import TradeCheck from "./TradeCheck";

export default function App() {
  return (
    <GameShell topbar={<GameTopbar title="Trade Check" />}>
      <TradeCheck />
    </GameShell>
  );
}
