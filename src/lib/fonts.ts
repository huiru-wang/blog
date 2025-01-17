import { Roboto_Mono } from "next/font/google";
import { Press_Start_2P } from "next/font/google";

const roboto_mono = Roboto_Mono({ subsets: ["latin"] });

const press_start_2p = Press_Start_2P({ subsets: ["latin"], weight: '400' });

export { roboto_mono, press_start_2p }