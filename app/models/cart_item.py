from .db import db, environment, SCHEMA, add_prefix_for_prod



class CartItem(db.Model):
        __tablename__ = "cart_items"

        if environment == "production":
            __table_args__ = {'schema': SCHEMA}

        id = db.Column(db.Integer, primary_key=True)
        cart_id = db.Column(db.Integer, db.ForeignKey(("carts.id")), nullable=False)
        book_id = db.Column(db.Integer, db.ForeignKey(("books.id")), nullable=False)
        quantity = db.Column(db.Integer, nullable=False)

    # RELATIONSHIPS:
    # item_cart <--> cart_items
        item_cart = db.relationship("Cart", back_populates="cart_items")

    # book <--> cart_item
        book = db.relationship("Book", back_populates="cart_item")

        def to_dict(self):
            return {
                "id": self.id,
                "cart_id": self.cart_id,
                "book_id": self.book_id,
                "quantity": self.quantity,
                "book": self.book.to_dict()
            }

        def __repr__(self):
            return f"<Book: {self.book_id}, Cart: {self.cart_id}>"
