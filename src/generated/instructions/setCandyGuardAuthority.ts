/**
 * This code was AUTOGENERATED using the kinobi library.
 * Please DO NOT EDIT THIS FILE, instead use visitors
 * to add features, then rerun kinobi to update it.
 *
 * @see https://github.com/metaplex-foundation/kinobi
 */

import {
  Context,
  Pda,
  PublicKey,
  Signer,
  TransactionBuilder,
  transactionBuilder,
} from '@metaplex-foundation/umi';
import {
  Serializer,
  array,
  mapSerializer,
  publicKey as publicKeySerializer,
  struct,
  u8,
} from '@metaplex-foundation/umi/serializers';
import {
  ResolvedAccount,
  ResolvedAccountsWithIndices,
  getAccountMetasAndSigners,
} from '../shared';

// Accounts.
export type SetCandyGuardAuthorityInstructionAccounts = {
  candyGuard: PublicKey | Pda;
  authority?: Signer;
};

// Data.
export type SetCandyGuardAuthorityInstructionData = {
  discriminator: Array<number>;
  newAuthority: PublicKey;
};

export type SetCandyGuardAuthorityInstructionDataArgs = {
  newAuthority: PublicKey;
};

export function getSetCandyGuardAuthorityInstructionDataSerializer(): Serializer<
  SetCandyGuardAuthorityInstructionDataArgs,
  SetCandyGuardAuthorityInstructionData
> {
  return mapSerializer<
    SetCandyGuardAuthorityInstructionDataArgs,
    any,
    SetCandyGuardAuthorityInstructionData
  >(
    struct<SetCandyGuardAuthorityInstructionData>(
      [
        ['discriminator', array(u8(), { size: 8 })],
        ['newAuthority', publicKeySerializer()],
      ],
      { description: 'SetCandyGuardAuthorityInstructionData' }
    ),
    (value) => ({
      ...value,
      discriminator: [133, 250, 37, 21, 110, 163, 26, 121],
    })
  ) as Serializer<
    SetCandyGuardAuthorityInstructionDataArgs,
    SetCandyGuardAuthorityInstructionData
  >;
}

// Args.
export type SetCandyGuardAuthorityInstructionArgs =
  SetCandyGuardAuthorityInstructionDataArgs;

// Instruction.
export function setCandyGuardAuthority(
  context: Pick<Context, 'identity' | 'programs'>,
  input: SetCandyGuardAuthorityInstructionAccounts &
    SetCandyGuardAuthorityInstructionArgs
): TransactionBuilder {
  // Program ID.
  const programId = context.programs.getPublicKey(
    'mplCandyGuard',
    'Guard1JwRhJkVH6XZhzoYxeBVQe872VH6QggF4BWmS9g'
  );

  // Accounts.
  const resolvedAccounts: ResolvedAccountsWithIndices = {
    candyGuard: { index: 0, isWritable: true, value: input.candyGuard ?? null },
    authority: { index: 1, isWritable: false, value: input.authority ?? null },
  };

  // Arguments.
  const resolvedArgs: SetCandyGuardAuthorityInstructionArgs = { ...input };

  // Default values.
  if (!resolvedAccounts.authority.value) {
    resolvedAccounts.authority.value = context.identity;
  }

  // Accounts in order.
  const orderedAccounts: ResolvedAccount[] = Object.values(
    resolvedAccounts
  ).sort((a, b) => a.index - b.index);

  // Keys and Signers.
  const [keys, signers] = getAccountMetasAndSigners(
    orderedAccounts,
    'programId',
    programId
  );

  // Data.
  const data = getSetCandyGuardAuthorityInstructionDataSerializer().serialize(
    resolvedArgs as SetCandyGuardAuthorityInstructionDataArgs
  );

  // Bytes Created On Chain.
  const bytesCreatedOnChain = 0;

  return transactionBuilder([
    { instruction: { keys, programId, data }, signers, bytesCreatedOnChain },
  ]);
}