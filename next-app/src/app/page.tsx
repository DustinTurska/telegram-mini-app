// "use client";

// import { useEffect, useState } from 'react';
// import './index.css';
// import Arrow from './icons/Arrow';
// import Image from 'next/image';
// import { bear, op, highVoltage, notcoin, rocket, trophy } from './images';
// import { ClaimButton, ConnectButton } from 'thirdweb/react';
// import { client } from "./client";
// import { optimism } from "thirdweb/chains";
// import { useWindowSize } from 'react-use';
// import Confetti from 'react-confetti';
// import { balanceOf } from "thirdweb/extensions/erc721";

// const App = () => {
//   const [points, setPoints] = useState(0);
//   const [energy, setEnergy] = useState(1000); // Start energy at 1000
//   const [maxEnergy, setMaxEnergy] = useState(1000); // Track the maximum energy
//   const [clicks, setClicks] = useState<{ id: number, x: number, y: number }[]>([]);
//   const [isGameDisabled, setIsGameDisabled] = useState(false);
//   const pointsToAdd = 12;
//   const energyToReduce = 12;
//   const [showConfetti, setShowConfetti] = useState(false);
//   const [transactionHash, setTransactionHash] = useState("");
//   const [openSea, setOpenSea] = useState("op-superchain-accelerator");
//   const { width, height } = useWindowSize();

//   const shareOnTwitter = () => {
//     const tweetText = `I just scored ${points} points in this awesome game! Can you beat my score? #GameChallenge`;
//     const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}`;
//     window.open(twitterUrl, '_blank');
//   };

//   const handleTransactionSent = (transactionResult: { readonly transactionHash: `0x${string}`; client: any; chain: any; maxBlocksWaitTime?: number }) => {
//     const { transactionHash } = transactionResult;
//     setShowConfetti(true);
//     setTransactionHash(transactionHash);
//     setMaxEnergy((prevMaxEnergy) => {
//       const newMaxEnergy = prevMaxEnergy + 1000;
//       setEnergy(newMaxEnergy); // Fill the energy bar completely
//       return newMaxEnergy;
//     });
//     setIsGameDisabled(false); // Re-enable the game
//     setTimeout(() => setShowConfetti(false), 1500);
//   };

//   const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
//     if (isGameDisabled) {
//       return;
//     }

//     const rect = e.currentTarget.getBoundingClientRect();
//     const x = e.clientX - rect.left;
//     const y = e.clientY - rect.top;

//     setPoints(points + pointsToAdd);
//     setEnergy((prevEnergy) => {
//       const newEnergy = prevEnergy - energyToReduce;
//       if (newEnergy <= 0) {
//         setIsGameDisabled(true);
//         return 0;
//       }
//       return newEnergy;
//     });
//     setClicks([...clicks, { id: Date.now(), x, y }]);
//   };

//   const handleAnimationEnd = (id: number) => {
//     setClicks((prevClicks) => prevClicks.filter(click => click.id !== id));
//   };

//   // useEffect hook to restore energy over time
//   useEffect(() => {
//     const interval = setInterval(() => {
//       setEnergy((prevEnergy) => {
//         const newEnergy = Math.min(prevEnergy + 1, maxEnergy); // Use maxEnergy for limit
//         if (newEnergy === maxEnergy) {
//           setIsGameDisabled(false);
//         }
//         return newEnergy;
//       });
//     }, 100); // Restore 10 energy points every second

//     return () => clearInterval(interval); // Clear interval on component unmount
//   }, [maxEnergy]); // Add maxEnergy as a dependency

//   return (
//     <div className="bg-gradient-main min-h-screen px-4 flex flex-col items-center text-white font-medium">
//       {showConfetti && <Confetti width={width} height={height} />}
//       <div className="absolute inset-0 h-1/2 bg-gradient-overlay z-0"></div>
//       <div className="absolute inset-0 flex items-center justify-center z-0">
//         <div className="radial-gradient-overlay"></div>
//       </div>
//       <div className="w-full z-10 min-h-screen flex flex-col items-center text-white">
//         <div className="fixed top-0 left-0 w-full px-4 pt-8 z-10 flex flex-col items-center text-white">
//           <div className="w-full cursor-pointer">
//             <ConnectButton
//               client={client}
//               accountAbstraction={{
//                 chain: optimism,
//                 factoryAddress: "0x85e23b94e7F5E9cC1fF78BCe78cfb15B81f0DF00",
//                 gasless: true,
//               }}
//             >
//             </ConnectButton>
//           </div>
//           <div className="mt-12 text-5xl font-bold flex items-center">
//             <Image src={op} width={44} height={44} alt={''} />
//             <span className="ml-2">{points.toLocaleString()}</span>
//           </div>
//           <div className="text-base mt-2 flex items-center">
//             <Image src={trophy} width={24} height={24} alt={''} />
//             <span className="ml-1">Gold <Arrow size={18} className="ml-0 mb-1 inline-block" /></span>
//           </div>
//         </div>

//         <div className="fixed bottom-0 left-0 w-full px-4 pb-4 z-10">
//           <div className="w-full flex justify-between gap-2">
//             <div className="w-1/3 flex items-center justify-start max-w-32">
//               <div className="flex items-center justify-center">
//                 <Image src={highVoltage} width={44} height={44} alt="High Voltage" />
//                 <div className="ml-2 text-left">
//                   <span className="text-white text-2xl font-bold block">{energy}</span>
//                   <span className="text-white text-large opacity-75">/ {maxEnergy}</span>
//                 </div>
//               </div>
//             </div>
//             <div className="flex-grow flex items-center max-w-60 text-sm">
//               <div className="w-full bg-[#000000] py-4 rounded-2xl flex justify-around">
//                 <button className="flex flex-col items-center gap-1">
//                   <Image src={bear} width={24} height={24} alt="High Voltage" />
//                   <span>Frens</span>
//                 </button>
//                 <div className="h-[48px] w-[2px] bg-[#fb0707]"></div>
//                 <button className="flex flex-col items-center gap-1">
//                   <Image src={op} width={24} height={24} alt="High Voltage" />
//                   <span>Earn</span>
//                 </button>
//                 <div className="h-[48px] w-[2px] bg-[#fb0707]"></div>
//                 <button
//                   className="flex flex-col items-center gap-1"
//                   onClick={shareOnTwitter}
//                 >
//                   <Image src={rocket} width={24} height={24} alt="High Voltage" />
//                   <span>Share</span>
//                 </button>
//               </div>
//             </div>
//           </div>
//           <div className="w-full bg-[#ff3030] rounded-full mt-4">
//             <div className="bg-gradient-to-r from-[#ff3030] to-[#fffad0] h-4 rounded-full" style={{ width: `${(energy / maxEnergy) * 100}%` }}></div>
//           </div>
//         </div>

//         <div className="flex-grow flex items-center justify-center">
//           {isGameDisabled ? (
//             <div className="text-2xl text-white flex flex-col items-center justify-center h-full">
//               <div>Out of energy, mint a boost!</div>
//               <ClaimButton
//                 contractAddress="0x2992e480001AfA6097a4BC7bB8c02d7df819d4cE"
//                 chain={optimism}
//                 client={client}
//                 onTransactionSent={handleTransactionSent}
//                 claimParams={{
//                   type: "ERC721",
//                   quantity: 1n,
//                 }}
//               >
//                 Claim NFT
//               </ClaimButton>
//             </div>
//           ) : (
//             <div className="relative mt-4" onClick={handleClick}>
//               <Image src={op} width={256} height={256} alt="op" />
//               {clicks.map((click) => (
//                 <div
//                   key={click.id}
//                   className="absolute text-5xl font-bold opacity-0"
//                   style={{
//                     top: `${click.y - 42}px`,
//                     left: `${click.x - 28}px`,
//                     animation: `float 1s ease-out`
//                   }}
//                   onAnimationEnd={() => handleAnimationEnd(click.id)}
//                 >
//                   12
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default App;
"use client";

import { useEffect, useState } from 'react';
import './index.css';
import Arrow from './icons/Arrow';
import Image from 'next/image';
import { bear, op, highVoltage, notcoin, rocket, trophy } from './images';
import { ClaimButton, ConnectButton } from 'thirdweb/react';
import { client } from "./client";
import { optimism } from "thirdweb/chains";
import { useWindowSize } from 'react-use';
import Confetti from 'react-confetti';
import { balanceOf } from "thirdweb/extensions/erc721";
import LevelDisplay from './LevelDisplay'
import { inAppWallet } from 'thirdweb/wallets';

const App = () => {
  const [points, setPoints] = useState(0);
  const [energy, setEnergy] = useState(1000); // Start energy at 1000
  const [maxEnergy, setMaxEnergy] = useState(1000); // Track the maximum energy
  const [clicks, setClicks] = useState<{ id: number, x: number, y: number }[]>([]);
  const [isGameDisabled, setIsGameDisabled] = useState(false);
  const pointsToAdd = 12;
  const energyToReduce = 12;
  const [showConfetti, setShowConfetti] = useState(false);
  const [transactionHash, setTransactionHash] = useState("");
  const [openSea, setOpenSea] = useState("op-superchain-accelerator");
  const { width, height } = useWindowSize();
  const [boostNFTs, setBoostNFTs] = useState(0);

  const wallets = [
    inAppWallet({
      auth: {
        options: [
          "email",
          "google",
          "apple",
          "facebook",
          "phone",
        ],
      },
    }),
  ];

  const shareOnTwitter = () => {
    const tweetText = `I just scored ${points} points in this awesome game! Can you beat my score? #GameChallenge`;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}`;
    window.open(twitterUrl, '_blank');
  };

  const handleTransactionSent = (transactionResult: { readonly transactionHash: `0x${string}`; client: any; chain: any; maxBlocksWaitTime?: number }) => {
    const { transactionHash } = transactionResult;
    setShowConfetti(true);
    setTransactionHash(transactionHash);
    setMaxEnergy((prevMaxEnergy) => {
      const newMaxEnergy = prevMaxEnergy + 1000;
      setEnergy(newMaxEnergy); // Fill the energy bar completely
      return newMaxEnergy;
    });
    setIsGameDisabled(false); // Re-enable the game
    setTimeout(() => setShowConfetti(false), 1500);
  };

  const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (isGameDisabled) {
      return;
    }

    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setPoints(points + pointsToAdd);
    setEnergy((prevEnergy) => {
      const newEnergy = prevEnergy - energyToReduce;
      if (newEnergy <= 0) {
        setIsGameDisabled(true);
        return 0;
      }
      return newEnergy;
    });
    setClicks([...clicks, { id: Date.now(), x, y }]);
  };

  const handleAnimationEnd = (id: number) => {
    setClicks((prevClicks) => prevClicks.filter(click => click.id !== id));
  };

  // useEffect hook to restore energy over time
  useEffect(() => {
    const interval = setInterval(() => {
      setEnergy((prevEnergy) => {
        const newEnergy = Math.min(prevEnergy + 1, maxEnergy); // Use maxEnergy for limit
        if (newEnergy === maxEnergy) {
          setIsGameDisabled(false);
        }
        return newEnergy;
      });
    }, 100); // Restore 10 energy points every second

    return () => clearInterval(interval);
  }, [maxEnergy]);

  return (
    <div className="bg-gradient-main min-h-screen px-4 flex flex-col items-center text-white font-medium">
      {showConfetti && <Confetti width={width} height={height} />}
      
      <div className="absolute inset-0 h-1/2 bg-gradient-overlay z-0"></div>
      <div className="absolute inset-0 flex items-center justify-center z-0">
        <div className="radial-gradient-overlay"></div>
      </div>
      <div className="w-full z-10 min-h-screen flex flex-col items-center text-white">
        <div className="fixed top-0 left-0 w-full px-4 pt-8 z-10 flex flex-col items-center text-white">
          <div className="w-full cursor-pointer">
            <ConnectButton
              client={client}
              accountAbstraction={{
                chain: optimism,
                factoryAddress: "0x85e23b94e7F5E9cC1fF78BCe78cfb15B81f0DF00",
                gasless: true,
              }}
            >
            </ConnectButton>
          </div>
          <div className="mt-12 text-5xl font-bold flex items-center">
            <Image src={op} width={44} height={44} alt={''} />
            <span className="ml-2">{points.toLocaleString()}</span>
          </div>
          <div className="text-base mt-2 flex items-center">
            <Image src={trophy} width={24} height={24} alt={''} />
            <span className="ml-1">Gold <Arrow size={18} className="ml-0 mb-1 inline-block" /></span>
          </div>
        </div>

        <div className="fixed bottom-0 left-0 w-full px-4 pb-4 z-10">
          <div className="w-full flex justify-between gap-2">
            <div className="w-1/3 flex items-center justify-start max-w-32">
              <div className="flex items-center justify-center">
                <Image src={highVoltage} width={44} height={44} alt="High Voltage" />
                <div className="ml-2 text-left">
                  <span className="text-white text-2xl font-bold block">{energy}</span>
                  <span className="text-white text-large opacity-75">/ {maxEnergy}</span>
                </div>
              </div>
            </div>
            <div className="flex-grow flex items-center max-w-60 text-sm">
              <div className="w-full bg-[#000000] py-4 rounded-2xl flex justify-around">
                <button className="flex flex-col items-center gap-1">
                  <Image src={bear} width={24} height={24} alt="High Voltage" />
                  <span>Frens</span>
                </button>
                <div className="h-[48px] w-[2px] bg-[#fb0707]"></div>
                <button className="flex flex-col items-center gap-1">
                  <Image src={op} width={24} height={24} alt="High Voltage" />
                  <span>Earn</span>
                </button>
                <div className="h-[48px] w-[2px] bg-[#fb0707]"></div>
                <button
                  className="flex flex-col items-center gap-1"
                  onClick={shareOnTwitter}
                >
                  <Image src={rocket} width={24} height={24} alt="High Voltage" />
                  <span>Share</span>
                </button>
              </div>
            </div>
          </div>
          <div className="w-full bg-[#ff3030] rounded-full mt-4">
            <div className="bg-gradient-to-r from-[#ff3030] to-[#fffad0] h-4 rounded-full" style={{ width: `${(energy / maxEnergy) * 100}%` }}></div>
          </div>
        </div>

        <div className="flex-grow flex items-center justify-center">
          {isGameDisabled ? (
            <div className="text-2xl text-white flex flex-col items-center justify-center h-full">
              <div>Out of energy, mint a boost!</div>
              <ClaimButton
                contractAddress="0x2992e480001AfA6097a4BC7bB8c02d7df819d4cE"
                chain={optimism}
                client={client}
                onTransactionSent={handleTransactionSent}
                claimParams={{
                  type: "ERC721",
                  quantity: 1n,
                }}
              >
                Claim NFT
              </ClaimButton>
            </div>
          ) : (
            <div className="relative mt-4" onClick={handleClick}>
              <Image src={op} width={256} height={256} alt="op" />
              {clicks.map((click) => (
                <div
                  key={click.id}
                  className="absolute text-5xl font-bold opacity-0"
                  style={{
                    top: `${click.y - 42}px`,
                    left: `${click.x - 28}px`,
                    animation: `float 1s ease-out`
                  }}
                  onAnimationEnd={() => handleAnimationEnd(click.id)}
                >
                  12
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;