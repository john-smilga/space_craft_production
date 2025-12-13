"""Service for stores business logic."""


from django.db.models import QuerySet

from accounts.models import Company
from stores.models import Store


def create_store(
    name: str, store_code: str, address: str, company: Company, created_by: any
) -> Store:
    """Create a new store.

    Args:
        name: Store name
        store_code: Unique store code
        address: Store address
        company: Company instance
        created_by: User who creates the store

    Returns:
        Created Store instance

    Raises:
        ValueError: If store code already exists for company
    """
    store_code = store_code.upper()

    if Store.objects.filter(company=company, store_code=store_code).exists():
        raise ValueError("A store with this code already exists in your company")

    store = Store.objects.create(
        name=name,
        store_code=store_code,
        address=address,
        company=company,
        created_by=created_by,
    )

    return store


def update_store(
    store: Store, name: str | None = None, address: str | None = None
) -> Store:
    """Update store fields.

    Args:
        store: Store instance to update
        name: New name (optional)
        address: New address (optional)

    Returns:
        Updated Store instance
    """
    if name:
        store.name = name
    if address:
        store.address = address

    store.save()
    return store


def get_store_by_slug(company: Company, slug: str) -> Store | None:
    """Get store by slug (derived from store_code).

    Args:
        company: Company instance
        slug: Store slug

    Returns:
        Store instance or None if not found
    """
    stores = Store.objects.filter(company=company)
    for store in stores:
        if store.slug == slug:
            return store
    return None


def get_stores_for_company(company: Company) -> QuerySet:
    """Get all stores for a company.

    Args:
        company: Company instance

    Returns:
        QuerySet of Store instances
    """
    return (
        Store.objects.filter(company=company)
        .select_related("company", "created_by")
        .order_by("-created_at")
    )
