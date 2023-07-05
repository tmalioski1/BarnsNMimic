"""empty message

Revision ID: 7ad3e67b4ed3
Revises: cf7c367c43fe
Create Date: 2023-07-04 16:45:08.148530

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '7ad3e67b4ed3'
down_revision = 'cf7c367c43fe'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('cart_items', sa.Column('added', sa.Boolean(), nullable=True))
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('cart_items', 'added')
    # ### end Alembic commands ###
