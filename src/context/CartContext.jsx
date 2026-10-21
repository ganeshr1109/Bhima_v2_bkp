import { createContext, useContext, useEffect, useState } from 'react'

const CartContext = createContext()

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    try {
      const savedCart = localStorage.getItem('bhima-cart')
      return savedCart ? JSON.parse(savedCart) : []
    } catch {
      return []
    }
  })

  useEffect(() => {
    localStorage.setItem('bhima-cart', JSON.stringify(cart))
  }, [cart])

  // ADD TO CART
  const addToCart = (product, quantity = 1) => {
    setCart((currentCart) => {
      const existing = currentCart.find(
        (item) => item.id === product.id
      )

      // Same product → increase quantity
      if (existing) {
        return currentCart.map((item) =>
          item.id === product.id
            ? {
                ...item,
                quantity: item.quantity + quantity,
              }
            : item
        )
      }

      // New product → add new item
      return [
        ...currentCart,
        {
          ...product,
          quantity,
        },
      ]
    })
  }

  // REMOVE PRODUCT
  const removeFromCart = (productId) => {
    setCart((currentCart) =>
      currentCart.filter(
        (item) => item.id !== productId
      )
    )
  }

  // UPDATE QUANTITY
  const updateQuantity = (productId, quantity) => {
    if (quantity < 1) return

    setCart((currentCart) =>
      currentCart.map((item) =>
        item.id === productId
          ? {
              ...item,
              quantity,
            }
          : item
      )
    )
  }

  // CLEAR CART
  const clearCart = () => {
    setCart([])
  }

  // NUMBER OF UNIQUE PRODUCTS
  const cartCount = cart.length

  // TOTAL PRICE
  const cartTotal = cart.reduce(
    (total, item) =>
      total + item.price * item.quantity,
    0
  )

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartCount,
        cartTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  return useContext(CartContext)
}