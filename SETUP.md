# Post-Deployment Setup

After deploying to Render, run these commands to set up users:

## 1. Create Superuser

```bash
python manage.py createsuperuser
```

Follow the prompts to create your superuser account.

## 2. Create Companies and Company Admins

After creating the superuser, you can create companies and company admins through:

### Option A: Django Admin (Recommended)
1. Log into Django admin at `https://your-app.onrender.com/admin/`
2. Create companies in the "Companies" section
3. Create users with `role='admin'` and assign them to companies

### Option B: Django Shell
Connect to your Render instance via SSH/Shell and run:

```python
python manage.py shell
```

Then in the shell:
```python
from accounts.models import Company, User

# Create Company 1
company1 = Company.objects.create(name="Company 1 Name")

# Create Company 1 Admin
admin1 = User.objects.create_user(
    username='admin1',
    email='admin1@company1.com',
    password='your-secure-password',
    company=company1,
    role='admin',
    is_staff=True
)

# Create Company 2
company2 = Company.objects.create(name="Company 2 Name")

# Create Company 2 Admin
admin2 = User.objects.create_user(
    username='admin2',
    email='admin2@company2.com',
    password='your-secure-password',
    company=company2,
    role='admin',
    is_staff=True
)
```

