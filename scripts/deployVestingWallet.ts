import { toNano } from 'ton-core';
import { VestingWallet } from '../wrappers/VestingWallet';
import { compile, NetworkProvider } from '@ton-community/blueprint';

export async function run(provider: NetworkProvider) {
    const vestingWallet = provider.open(
        VestingWallet.createFromConfig(
            {
            },
            await compile('VestingWallet')
        )
    );

    await vestingWallet.sendDeploy(provider.sender(), toNano('0.05'));

    await provider.waitForDeploy(vestingWallet.address);

    console.log('lockupData', await vestingWallet.getVestingData());
}
