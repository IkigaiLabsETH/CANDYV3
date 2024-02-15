/**
 * This code was AUTOGENERATED using the kinobi library.
 * Please DO NOT EDIT THIS FILE, instead use visitors
 * to add features, then rerun kinobi to update it.
 *
 * @see https://github.com/metaplex-foundation/kinobi
 */

import { PublicKey } from '@metaplex-foundation/umi';
import {
  Serializer,
  publicKey as publicKeySerializer,
  struct,
} from '@metaplex-foundation/umi/serializers';

/**
 * Guard that requires a specified signer to validate the transaction.
 *
 * List of accounts required:
 *
 * 0. `[signer]` Signer of the transaction.
 */

export type ThirdPartySigner = { signerKey: PublicKey };

export type ThirdPartySignerArgs = ThirdPartySigner;

export function getThirdPartySignerSerializer(): Serializer<
  ThirdPartySignerArgs,
  ThirdPartySigner
> {
  return struct<ThirdPartySigner>([['signerKey', publicKeySerializer()]], {
    description: 'ThirdPartySigner',
  }) as Serializer<ThirdPartySignerArgs, ThirdPartySigner>;
}