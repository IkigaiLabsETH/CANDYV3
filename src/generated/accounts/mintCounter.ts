/**
 * This code was AUTOGENERATED using the kinobi library.
 * Please DO NOT EDIT THIS FILE, instead use visitors
 * to add features, then rerun kinobi to update it.
 *
 * @see https://github.com/metaplex-foundation/kinobi
 */

import {
  Account,
  Context,
  Pda,
  PublicKey,
  RpcAccount,
  RpcGetAccountOptions,
  RpcGetAccountsOptions,
  assertAccountExists,
  deserializeAccount,
  gpaBuilder,
  publicKey as toPublicKey,
} from '@metaplex-foundation/umi';
import {
  Serializer,
  publicKey as publicKeySerializer,
  string,
  struct,
  u16,
  u8,
} from '@metaplex-foundation/umi/serializers';

/** PDA to track the number of mints for an individual address. */
export type MintCounter = Account<MintCounterAccountData>;

export type MintCounterAccountData = { count: number };

export type MintCounterAccountDataArgs = MintCounterAccountData;

export function getMintCounterAccountDataSerializer(): Serializer<
  MintCounterAccountDataArgs,
  MintCounterAccountData
> {
  return struct<MintCounterAccountData>([['count', u16()]], {
    description: 'MintCounterAccountData',
  }) as Serializer<MintCounterAccountDataArgs, MintCounterAccountData>;
}

export function deserializeMintCounter(rawAccount: RpcAccount): MintCounter {
  return deserializeAccount(rawAccount, getMintCounterAccountDataSerializer());
}

export async function fetchMintCounter(
  context: Pick<Context, 'rpc'>,
  publicKey: PublicKey | Pda,
  options?: RpcGetAccountOptions
): Promise<MintCounter> {
  const maybeAccount = await context.rpc.getAccount(
    toPublicKey(publicKey, false),
    options
  );
  assertAccountExists(maybeAccount, 'MintCounter');
  return deserializeMintCounter(maybeAccount);
}

export async function safeFetchMintCounter(
  context: Pick<Context, 'rpc'>,
  publicKey: PublicKey | Pda,
  options?: RpcGetAccountOptions
): Promise<MintCounter | null> {
  const maybeAccount = await context.rpc.getAccount(
    toPublicKey(publicKey, false),
    options
  );
  return maybeAccount.exists ? deserializeMintCounter(maybeAccount) : null;
}

export async function fetchAllMintCounter(
  context: Pick<Context, 'rpc'>,
  publicKeys: Array<PublicKey | Pda>,
  options?: RpcGetAccountsOptions
): Promise<MintCounter[]> {
  const maybeAccounts = await context.rpc.getAccounts(
    publicKeys.map((key) => toPublicKey(key, false)),
    options
  );
  return maybeAccounts.map((maybeAccount) => {
    assertAccountExists(maybeAccount, 'MintCounter');
    return deserializeMintCounter(maybeAccount);
  });
}

export async function safeFetchAllMintCounter(
  context: Pick<Context, 'rpc'>,
  publicKeys: Array<PublicKey | Pda>,
  options?: RpcGetAccountsOptions
): Promise<MintCounter[]> {
  const maybeAccounts = await context.rpc.getAccounts(
    publicKeys.map((key) => toPublicKey(key, false)),
    options
  );
  return maybeAccounts
    .filter((maybeAccount) => maybeAccount.exists)
    .map((maybeAccount) => deserializeMintCounter(maybeAccount as RpcAccount));
}

export function getMintCounterGpaBuilder(
  context: Pick<Context, 'rpc' | 'programs'>
) {
  const programId = context.programs.getPublicKey(
    'mplCandyGuard',
    'Guard1JwRhJkVH6XZhzoYxeBVQe872VH6QggF4BWmS9g'
  );
  return gpaBuilder(context, programId)
    .registerFields<{ count: number }>({ count: [0, u16()] })
    .deserializeUsing<MintCounter>((account) => deserializeMintCounter(account))
    .whereSize(2);
}

export function getMintCounterSize(): number {
  return 2;
}

export function findMintCounterPda(
  context: Pick<Context, 'eddsa' | 'programs'>,
  seeds: {
    /** A unique identifier in the context of a Candy Machine/Candy Guard combo */
    id: number;
    /** The address of the wallet trying to mint */
    user: PublicKey;
    /** The address of the Candy Guard account */
    candyGuard: PublicKey;
    /** The address of the Candy Machine account */
    candyMachine: PublicKey;
  }
): Pda {
  const programId = context.programs.getPublicKey(
    'mplCandyGuard',
    'Guard1JwRhJkVH6XZhzoYxeBVQe872VH6QggF4BWmS9g'
  );
  return context.eddsa.findPda(programId, [
    string({ size: 'variable' }).serialize('mint_limit'),
    u8().serialize(seeds.id),
    publicKeySerializer().serialize(seeds.user),
    publicKeySerializer().serialize(seeds.candyGuard),
    publicKeySerializer().serialize(seeds.candyMachine),
  ]);
}

export async function fetchMintCounterFromSeeds(
  context: Pick<Context, 'eddsa' | 'programs' | 'rpc'>,
  seeds: Parameters<typeof findMintCounterPda>[1],
  options?: RpcGetAccountOptions
): Promise<MintCounter> {
  return fetchMintCounter(context, findMintCounterPda(context, seeds), options);
}

export async function safeFetchMintCounterFromSeeds(
  context: Pick<Context, 'eddsa' | 'programs' | 'rpc'>,
  seeds: Parameters<typeof findMintCounterPda>[1],
  options?: RpcGetAccountOptions
): Promise<MintCounter | null> {
  return safeFetchMintCounter(
    context,
    findMintCounterPda(context, seeds),
    options
  );
}