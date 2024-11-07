import {
    ThirdwebNftMedia,
    useContract,
    useNFT,
    Web3Button,
} from "@thirdweb-dev/react";
import type { FC } from "react";

import styles from "../styles/Home.module.css";

interface NFTCardProps {
    tokenId: number;
    stakingContractAddresss: string;
    nftDropContractAddres: string;
    symbol:string
}


const NFTCard: FC<NFTCardProps> = ({ tokenId, stakingContractAddresss ,nftDropContractAddres,symbol }) => {

    const nftDropContractAddress = nftDropContractAddres;
    const stakingContractAddress = stakingContractAddresss;
    const { contract } = useContract(nftDropContractAddress, "nft-drop");
    const { data: nft } = useNFT(contract, tokenId);
    console.log("are you in nft card ? in NFTcard  " + stakingContractAddresss);
    return (
        <>
            {nft && (
                <div className={styles.nftBox}>
                    {nft.metadata && (
                        <ThirdwebNftMedia
                            metadata={nft.metadata}
                            className={styles.nftMedia}
                        />
                    )}
                    <h3>{nft.metadata.name}</h3>
                    <Web3Button
                        action={(contract) => contract?.call("withdraw", [[nft.metadata.id]])}
                        contractAddress={stakingContractAddress}
                    >
                        Withdraw
                    </Web3Button>
                </div>
            )}
        </>
    );
};
export default NFTCard;