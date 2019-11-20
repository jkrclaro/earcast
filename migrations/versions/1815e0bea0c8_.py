"""empty message

Revision ID: 1815e0bea0c8
Revises: ea62566e5217
Create Date: 2019-07-01 15:13:58.363057

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '1815e0bea0c8'
down_revision = 'ea62566e5217'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('products', sa.Column('category', sa.String(length=255), nullable=True))
    op.add_column('products', sa.Column('description', sa.String(length=255), nullable=True))
    op.add_column('products', sa.Column('renewal', sa.String(length=30), nullable=True))
    op.add_column('products', sa.Column('type', sa.String(length=30), nullable=True))
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('products', 'type')
    op.drop_column('products', 'renewal')
    op.drop_column('products', 'description')
    op.drop_column('products', 'category')
    # ### end Alembic commands ###