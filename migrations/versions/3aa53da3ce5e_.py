"""empty message

Revision ID: 3aa53da3ce5e
Revises: 
Create Date: 2023-03-27 21:37:55.748637

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '3aa53da3ce5e'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('users',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('first_name', sa.String(length=50), nullable=False),
    sa.Column('last_name', sa.String(length=50), nullable=False),
    sa.Column('username', sa.String(length=40), nullable=False),
    sa.Column('email', sa.String(length=255), nullable=False),
    sa.Column('hashed_password', sa.String(length=255), nullable=False),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('email'),
    sa.UniqueConstraint('username')
    )
    op.create_table('books',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('publisher_id', sa.Integer(), nullable=False),
    sa.Column('title', sa.String(length=255), nullable=False),
    sa.Column('author', sa.String(length=255), nullable=False),
    sa.Column('genre', sa.String(length=255), nullable=True),
    sa.Column('overview', sa.String(length=5000), nullable=True),
    sa.Column('editorial_review', sa.String(length=5000), nullable=True),
    sa.Column('publication_date', sa.String(), nullable=True),
    sa.Column('publisher', sa.String(length=255), nullable=True),
    sa.Column('price_paperback', sa.Float(), nullable=True),
    sa.Column('price_hardcover', sa.Float(), nullable=True),
    sa.Column('price_eBook', sa.Float(), nullable=True),
    sa.Column('cover_art', sa.String(length=255), nullable=True),
    sa.Column('pages', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['publisher_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('carts',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=True),
    sa.Column('total_price', sa.Float(), nullable=False),
    sa.Column('purchased', sa.Boolean(), nullable=True),
    sa.Column('order_number', sa.String(), nullable=False),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('cart_items',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('cart_id', sa.Integer(), nullable=False),
    sa.Column('book_id', sa.Integer(), nullable=False),
    sa.Column('quantity', sa.Integer(), nullable=False),
    sa.Column('price', sa.Float(), nullable=False),
    sa.ForeignKeyConstraint(['book_id'], ['books.id'], ),
    sa.ForeignKeyConstraint(['cart_id'], ['carts.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('reviews',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('book_id', sa.Integer(), nullable=False),
    sa.Column('stars', sa.Integer(), nullable=False),
    sa.Column('review_title', sa.String(length=100), nullable=False),
    sa.Column('review_txt', sa.String(length=5000), nullable=False),
    sa.Column('recommended', sa.String(), nullable=True),
    sa.Column('spoilers', sa.String(), nullable=True),
    sa.ForeignKeyConstraint(['book_id'], ['books.id'], ondelete='CASCADE'),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ondelete='CASCADE'),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('wishlists',
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('book_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['book_id'], ['books.id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('user_id', 'book_id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('wishlists')
    op.drop_table('reviews')
    op.drop_table('cart_items')
    op.drop_table('carts')
    op.drop_table('books')
    op.drop_table('users')
    # ### end Alembic commands ###