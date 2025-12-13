"""Factory Boy factories for creating test data."""

import factory
from django.contrib.auth import get_user_model
from factory.django import DjangoModelFactory

from accounts.models import Company
from displays.models import Display
from planograms.models import Planogram
from projects.models import Project
from stores.models import Store

User = get_user_model()


class CompanyFactory(DjangoModelFactory):
    """Factory for creating Company instances."""

    class Meta:
        model = Company

    name = factory.Sequence(lambda n: f"Company {n}")
    tax_id = factory.Sequence(lambda n: f"TAX{n:06d}")
    description = factory.Faker("catch_phrase")


class UserFactory(DjangoModelFactory):
    """Factory for creating User instances."""

    class Meta:
        model = User

    username = factory.Sequence(lambda n: f"user{n}")
    email = factory.LazyAttribute(lambda obj: f"{obj.username}@example.com")
    password = factory.PostGenerationMethodCall("set_password", "password123")
    company = factory.SubFactory(CompanyFactory)
    role = "member"
    first_name = factory.Faker("first_name")
    last_name = factory.Faker("last_name")


class AdminUserFactory(UserFactory):
    """Factory for creating admin User instances."""

    username = factory.Sequence(lambda n: f"admin{n}")
    role = "admin"


class StoreFactory(DjangoModelFactory):
    """Factory for creating Store instances."""

    class Meta:
        model = Store

    name = factory.Sequence(lambda n: f"Store {n}")
    store_code = factory.Sequence(lambda n: f"ST{n:04d}")
    address = factory.Faker("address")
    company = factory.SubFactory(CompanyFactory)
    created_by = factory.SubFactory(
        UserFactory, company=factory.SelfAttribute("..company")
    )


class DisplayFactory(DjangoModelFactory):
    """Factory for creating Display instances (custom displays)."""

    class Meta:
        model = Display

    name = factory.Sequence(lambda n: f"Display {n}")
    type = "gondola"
    width_in = factory.Faker(
        "pydecimal",
        left_digits=2,
        right_digits=2,
        positive=True,
        min_value=24,
        max_value=96,
    )
    height_in = factory.Faker(
        "pydecimal",
        left_digits=2,
        right_digits=2,
        positive=True,
        min_value=36,
        max_value=84,
    )
    depth_in = factory.Faker(
        "pydecimal",
        left_digits=2,
        right_digits=2,
        positive=True,
        min_value=12,
        max_value=30,
    )
    shelf_count = factory.Faker("pyint", min_value=3, max_value=8)
    shelf_spacing = factory.Faker(
        "pydecimal",
        left_digits=2,
        right_digits=2,
        positive=True,
        min_value=10,
        max_value=18,
    )
    display_category = "custom"
    company = factory.SubFactory(CompanyFactory)
    created_by = factory.SubFactory(
        UserFactory, company=factory.SelfAttribute("..company")
    )


class StandardDisplayFactory(DisplayFactory):
    """Factory for creating standard Display instances (available to all companies)."""

    display_category = "standard"
    company = None
    created_by = factory.SubFactory(AdminUserFactory)


class ProjectFactory(DjangoModelFactory):
    """Factory for creating Project instances."""

    class Meta:
        model = Project

    name = factory.Sequence(lambda n: f"Project {n}")
    store = factory.SubFactory(StoreFactory)
    company = factory.LazyAttribute(lambda obj: obj.store.company)
    created_by = factory.SubFactory(
        UserFactory, company=factory.SelfAttribute("..company")
    )


class PlanogramFactory(DjangoModelFactory):
    """Factory for creating Planogram instances."""

    class Meta:
        model = Planogram

    name = factory.Sequence(lambda n: f"Planogram {n}")
    season = "summer"
    project = factory.SubFactory(ProjectFactory)
    company = factory.LazyAttribute(lambda obj: obj.project.company)
    display = factory.SubFactory(StandardDisplayFactory)

    # Dimensions from display or defaults
    width_in = factory.LazyAttribute(
        lambda obj: obj.display.width_in if obj.display else 48.0
    )
    height_in = factory.LazyAttribute(
        lambda obj: obj.display.height_in if obj.display else 60.0
    )
    depth_in = factory.LazyAttribute(
        lambda obj: obj.display.depth_in if obj.display else 18.0
    )
    shelf_count = factory.LazyAttribute(
        lambda obj: obj.display.shelf_count if obj.display else 5
    )
    shelf_spacing = factory.LazyAttribute(
        lambda obj: obj.display.shelf_spacing if obj.display else 12.0
    )

    category_ids = factory.List([1, 2, 3])
    layout = factory.Dict({})
    preserve_layout = False

    created_by = factory.SubFactory(
        UserFactory, company=factory.SelfAttribute("..company")
    )
    updated_by = factory.LazyAttribute(lambda obj: obj.created_by)
