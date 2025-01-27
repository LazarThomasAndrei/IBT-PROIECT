module sui_gg::ibt {
    use std::option; // Add missing import
    use sui::coin::{Self, Coin, TreasuryCap};
    use sui::transfer;
    use sui::tx_context::{Self, TxContext};
    use sui::object::{Self, UID};

    struct IBT has drop {}

    struct MintCapability has key, store { id: UID }
    struct BurnCapability has key, store { id: UID }

    fun init(witness: IBT, ctx: &mut TxContext) {
        let (treasury, metadata) = coin::create_currency(
            witness,
            9,
            b"IBT",
            b"IBT Token",
            b"",
            option::none(), 
            ctx
        );
        transfer::public_freeze_object(metadata);
        transfer::public_transfer(
            MintCapability { id: object::new(ctx) },
            tx_context::sender(ctx)
        );
        transfer::public_transfer(
            BurnCapability { id: object::new(ctx) },
            tx_context::sender(ctx)
        );
        transfer::public_transfer(treasury, tx_context::sender(ctx));
    }

    // Add #[allow(unused_variable)] to suppress warnings
    public entry fun mint(
        treasury: &mut TreasuryCap<IBT>,
        _mint_cap: &MintCapability, // Add underscore prefix
        amount: u64,
        recipient: address,
        ctx: &mut TxContext
    ) {
        let coins = coin::mint(treasury, amount, ctx);
        transfer::public_transfer(coins, recipient);
    }

    public entry fun burn(
        treasury: &mut TreasuryCap<IBT>,
        _burn_cap: &BurnCapability, // Add underscore prefix
        coins: Coin<IBT>
    ) {
        coin::burn(treasury, coins);
    }
}