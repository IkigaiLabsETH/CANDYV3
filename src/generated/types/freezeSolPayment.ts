/**
 * This code was AUTOGENERATED using the kinobi library.
 * Please DO NOT EDIT THIS FILE, instead use visitors
 * to add features, then rerun kinobi to update it.
 *
 * @see https://github.com/metaplex-foundation/kinobi
 */

import {
  PublicKey,
  SolAmount,
  mapAmountSerializer,
} from '@metaplex-foundation/umi';
import {
  Serializer,
  publicKey as publicKeySerializer,
  struct,
  u64,
} from '@metaplex-foundation/umi/serializers';

/**
 * Guard that charges an amount in SOL (lamports) for the mint with a freeze period.
 *
 * List of accounts required:
 *
 * 0. `[writable]` Freeze PDA to receive the funds (seeds `["freeze_escrow",
 * destination pubkey, candy guard pubkey, candy machine pubkey]`).
 * 1. `[]` Associate token account of the NFT (seeds `[payer pubkey, token
 * program pubkey, nft mint pubkey]`).
 * 2. `[optional]` Authorization rule set for the minted pNFT.
 */

export type FreezeSolPayment = { lamports: SolAmount; destination: PublicKey };

export type FreezeSolPaymentArgs = FreezeSolPayment;

export function getFreezeSolPaymentSerializer(): Serializer<
  FreezeSolPaymentArgs,
  FreezeSolPayment
> {
  return struct<FreezeSolPayment>(
    [
      ['lamports', mapAmountSerializer(u64(), 'SOL', 9)],
      ['destination', publicKeySerializer()],
    ],
    { description: 'FreezeSolPayment' }
  ) as Serializer<FreezeSolPaymentArgs, FreezeSolPayment>;
}
