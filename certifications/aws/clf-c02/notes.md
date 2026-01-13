---
title: "CLF-C02 - Study Notes"
description: "Comprehensive study notes for CLF-C02 AWS Certified Cloud Practitioner"
---

# CLF-C02: Study Notes

Comprehensive study notes for the CLF-C02 AWS Certified Cloud Practitioner certification.

[← Back to Overview](./index.md) | [← Objectives](./objectives.md) | [Exam Tips →](./exam-tips.md)

---

## Domain 1: Cloud Concepts (24%)

### 1.1: Benefits of the AWS Cloud

#### Six Advantages of Cloud Computing

1. **Trade Capital Expense for Variable Expense**
   - No upfront data center costs
   - Pay only for what you consume
   - Lower variable costs due to economies of scale

2. **Benefit from Massive Economies of Scale**
   - AWS achieves higher economies of scale
   - Lower pay-as-you-go prices
   - Hundreds of thousands of customers = lower costs

3. **Stop Guessing Capacity**
   - Scale up or down as needed
   - No expensive idle resources
   - Access as much or as little as you need

4. **Increase Speed and Agility**
   - New resources in minutes, not weeks
   - Experiment quickly and cost-effectively
   - Foster innovation

5. **Stop Spending Money Running and Maintaining Data Centers**
   - Focus on your business, not infrastructure
   - Let AWS handle the heavy lifting
   - Redirect resources to revenue-generating activities

6. **Go Global in Minutes**
   - Deploy applications in multiple Regions worldwide
   - Provide lower latency and better experience
   - Minimal cost

::: tip Why This Matters for the Exam
Questions often test your understanding of **when** each benefit applies. For example, "A company wants to reduce latency for global users" → Go global in minutes.
:::

---

### 1.2: AWS Well-Architected Framework

The framework consists of **6 pillars**:

#### 1. Operational Excellence
- **Focus**: Run and monitor systems to deliver business value
- **Key Concepts**:
  - Perform operations as code (Infrastructure as Code)
  - Make frequent, small, reversible changes
  - Refine operations procedures frequently
  - Anticipate failure
  - Learn from operational events

**Services**: CloudFormation, Systems Manager, CloudWatch, AWS Config

#### 2. Security
- **Focus**: Protect information, systems, and assets
- **Key Concepts**:
  - Implement strong identity foundation
  - Enable traceability
  - Apply security at all layers
  - Automate security best practices
  - Protect data in transit and at rest
  - Keep people away from data
  - Prepare for security events

**Services**: IAM, KMS, GuardDuty, Security Hub, WAF, Shield

#### 3. Reliability
- **Focus**: Ensure workloads perform intended functions correctly and consistently
- **Key Concepts**:
  - Automatically recover from failure
  - Test recovery procedures
  - Scale horizontally
  - Stop guessing capacity
  - Manage change through automation

**Services**: Auto Scaling, Multi-AZ deployments, S3, Backup, CloudFormation

#### 4. Performance Efficiency
- **Focus**: Use computing resources efficiently
- **Key Concepts**:
  - Democratize advanced technologies
  - Go global in minutes
  - Use serverless architectures
  - Experiment more often
  - Consider mechanical sympathy

**Services**: Lambda, Fargate, Aurora Serverless, CloudFront

#### 5. Cost Optimization
- **Focus**: Avoid unnecessary costs
- **Key Concepts**:
  - Implement cloud financial management
  - Adopt consumption model
  - Measure overall efficiency
  - Stop spending on undifferentiated heavy lifting
  - Analyze and attribute expenditure

**Services**: Cost Explorer, Budgets, Trusted Advisor, Reserved Instances, Savings Plans

#### 6. Sustainability
- **Focus**: Minimize environmental impact
- **Key Concepts**:
  - Understand your impact
  - Establish sustainability goals
  - Maximize utilization
  - Use managed services
  - Reduce downstream impact

**Services**: S3 Intelligent-Tiering, EC2 Auto Scaling, Lambda

::: warning Common Exam Trap
Don't confuse the **6 pillars of Well-Architected Framework** with the **5 characteristics of cloud computing**. They're different concepts!
:::

---

### 1.3: Cloud Migration Strategies - The 7 Rs

| Strategy | Description | When to Use | Example |
|----------|-------------|-------------|---------|
| **Retire** | Decommission applications | App is no longer needed | Legacy apps with low usage |
| **Retain** | Keep in source environment | Not ready to migrate | Mainframe apps requiring refactoring |
| **Rehost** | "Lift and shift" | Quick migration, minimal changes | Move VMs to EC2 as-is |
| **Relocate** | Move to AWS without changes | Hypervisor-level migration | VMware Cloud on AWS |
| **Repurchase** | Replace with SaaS | Move to cloud-native solution | Migrate from on-prem CRM to Salesforce |
| **Replatform** | "Lift, tinker, and shift" | Some cloud optimization | Move to RDS instead of self-managed DB |
| **Refactor** | Re-architect | Maximize cloud benefits | Redesign monolith to microservices |

::: tip Exam Decision Pattern
- **Fastest migration** → Rehost (lift and shift)
- **Minimal changes** → Rehost or Relocate
- **Moderate optimization** → Replatform
- **Maximum cloud benefits** → Refactor
- **Replace commercial software** → Repurchase
:::

---

### 1.4: Cloud Economics

#### On-Premises vs. Cloud Costs

**On-Premises (Fixed Costs):**
- ❌ Server hardware purchase
- ❌ Data center real estate
- ❌ Cooling and power
- ❌ IT staff for maintenance
- ❌ Over-provisioning for peak capacity

**Cloud (Variable Costs):**
- ✅ Pay for what you use
- ✅ Scale up/down as needed
- ✅ No upfront investment
- ✅ Operational expenditure (OpEx) not capital (CapEx)

#### AWS Pricing Models

| Model | Description | Use Case | Discount |
|-------|-------------|----------|----------|
| **On-Demand** | Pay by hour/second | Short-term, unpredictable workloads | None |
| **Reserved Instances (RI)** | 1 or 3 year commitment | Steady-state applications | Up to 75% |
| **Spot Instances** | Bid on spare capacity | Fault-tolerant, flexible workloads | Up to 90% |
| **Savings Plans** | Commit to usage ($/hour) | Flexible compute | Up to 72% |

::: danger Critical Exam Fact
**Spot Instances** can be interrupted with 2-minute notice. Never use for critical, time-sensitive workloads!
:::

---

## Domain 2: Security and Compliance (30%)

### 2.1: AWS Shared Responsibility Model

```
┌─────────────────────────────────────────┐
│      Customer Responsibility            │
│     (Security IN the cloud)             │
│                                          │
│  • Customer data                         │
│  • Platform, applications, IAM          │
│  • Operating system, network & firewall │
│  • Client-side encryption               │
│  • Server-side encryption (optional)    │
│  • Network traffic protection           │
└─────────────────────────────────────────┘
┌─────────────────────────────────────────┐
│       AWS Responsibility                 │
│     (Security OF the cloud)             │
│                                          │
│  • Hardware / AWS Global Infrastructure │
│  • Regions, AZs, Edge Locations         │
│  • Compute, storage, database, network  │
│  • Software (hypervisor, OS for managed)│
└─────────────────────────────────────────┘
```

#### Responsibility by Service Type

| Service Type | AWS Responsibility | Customer Responsibility |
|--------------|-------------------|-------------------------|
| **Infrastructure (EC2)** | Hardware, hypervisor, physical security | OS, applications, data, network config, security groups |
| **Container (RDS)** | OS patching, DB installation, hardware | DB credentials, user permissions, data, encryption settings |
| **Abstract (S3, Lambda)** | Everything except... | Data, access policies, encryption options |

::: tip Exam Pattern
"Who manages OS patches?"
- EC2 → Customer
- RDS → AWS
- Lambda → AWS (no OS to patch!)
:::

---

### 2.2: Compliance and Governance

#### AWS Artifact
- **Purpose**: Access AWS compliance reports
- **Features**:
  - Download security and compliance documents
  - AWS ISO certifications
  - SOC reports
  - PCI reports

#### Key Compliance Programs

| Program | Industry | What It Covers |
|---------|----------|----------------|
| **HIPAA** | Healthcare | Protected Health Information (PHI) |
| **PCI DSS** | Payment cards | Credit card data security |
| **FedRAMP** | US Government | Federal cloud security |
| **GDPR** | EU | Data privacy and protection |
| **SOC 1/2/3** | General | Service organization controls |

::: warning Common Mistake
AWS provides **infrastructure compliance**, but **you** are responsible for how you use it. Example: S3 is HIPAA-eligible, but YOU must configure encryption and access controls properly.
:::

#### Encryption

**At Rest:**
- Data stored on disk
- Services: S3, EBS, RDS
- Tool: AWS KMS (Key Management Service)

**In Transit:**
- Data moving between locations
- Protocols: TLS/SSL, HTTPS
- Services: CloudFront, ELB

---

### 2.3: Identity and Access Management (IAM)

#### Core IAM Concepts

**Users**: Individual people or applications
- Each has unique credentials
- Long-term access keys (avoid if possible)

**Groups**: Collection of users
- Apply policies to multiple users
- Users can belong to multiple groups
- Cannot nest groups

**Roles**: Temporary credentials for services or users
- No permanent credentials
- Assumed by users, applications, or AWS services
- Best practice for EC2, Lambda, etc.

**Policies**: JSON documents defining permissions
```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::my-bucket/*"
    }
  ]
}
```

#### Principle of Least Privilege

✅ **Do**: Grant minimum permissions needed
❌ **Don't**: Give admin access by default

**Example**:
- Developer needs S3 read access → Grant `s3:GetObject` only
- Not `s3:*` (all S3 actions)
- Not `AdministratorAccess` policy

#### Multi-Factor Authentication (MFA)

**Types**:
1. **Virtual MFA device** (app on phone) - Most common
2. **Hardware MFA device** (physical token)
3. **U2F security key** (YubiKey)

::: danger Critical Exam Fact
**Always enable MFA for root user**. This is the #1 security best practice.
:::

#### IAM Best Practices

1. ✅ Enable MFA for root account
2. ✅ Use roles instead of access keys
3. ✅ Apply least privilege
4. ✅ Rotate credentials regularly
5. ✅ Use groups to assign permissions
6. ✅ Monitor activity with CloudTrail

---

### 2.4: Security Services

#### AWS Shield
- **Purpose**: DDoS protection
- **Shield Standard**: Free, automatic protection
- **Shield Advanced**: $3,000/month, advanced protection + DDoS response team

#### AWS WAF (Web Application Firewall)
- **Purpose**: Protect web applications from common exploits
- **Features**:
  - SQL injection protection
  - Cross-site scripting (XSS) protection
  - Rate limiting
  - Geo-blocking

#### Amazon GuardDuty
- **Purpose**: Intelligent threat detection
- **How**: Analyzes logs (VPC Flow, CloudTrail, DNS)
- **Detects**: Cryptocurrency mining, suspicious API calls, compromised instances

#### AWS Security Hub
- **Purpose**: Central security and compliance view
- **Features**:
  - Aggregates findings from GuardDuty, Inspector, Macie
  - Compliance checks against standards (CIS, PCI DSS)
  - Prioritized security alerts

#### Decision Table: Which Security Service?

| Scenario | Service |
|----------|---------|
| Protect against DDoS attacks | AWS Shield |
| Filter web traffic by rules | AWS WAF |
| Detect threats across AWS accounts | Amazon GuardDuty |
| Central security dashboard | AWS Security Hub |
| Encrypt data | AWS KMS |
| Discover sensitive data in S3 | Amazon Macie |

---

## Domain 3: Cloud Technology and Services (34%)

### 3.1: Deployment and Operations

#### Methods of Interacting with AWS

| Method | Use Case | Example |
|--------|----------|---------|
| **AWS Management Console** | Visual, browser-based | Best for beginners, exploring services |
| **AWS CLI** | Command-line automation | Scripts, DevOps workflows |
| **AWS SDKs** | Programmatic access | Application integration (Python, Java, etc.) |
| **AWS CloudFormation** | Infrastructure as Code | Deploy entire environments with templates |
| **AWS CDK** | IaC with programming languages | Define infrastructure in TypeScript, Python |

#### Cloud Deployment Models

| Model | Description | Example |
|-------|-------------|---------|
| **Cloud** | 100% on AWS | Startup with no on-premises infrastructure |
| **Hybrid** | Mix of AWS and on-premises | Extend on-prem datacenter with AWS for bursting |
| **On-Premises** | Private cloud (not AWS) | Use AWS Outposts in your datacenter |

---

### 3.2: AWS Global Infrastructure

#### Key Components

**AWS Regions**
- Geographic area with multiple AZs
- 30+ Regions worldwide
- Choose based on:
  - ✅ Latency (proximity to users)
  - ✅ Compliance (data residency)
  - ✅ Service availability
  - ✅ Pricing

**Availability Zones (AZs)**
- One or more discrete data centers
- Each Region has 2-6 AZs
- Connected with high-bandwidth, low-latency networking
- Isolated for fault tolerance

**Edge Locations**
- 400+ locations worldwide
- Used by CloudFront (CDN)
- Cache content closer to users
- More locations than Regions

::: tip Exam Decision Pattern
- **Low latency for users** → Deploy in Region closest to users
- **High availability** → Deploy across multiple AZs
- **Fast content delivery** → Use CloudFront edge locations
- **Data must stay in specific country** → Choose appropriate Region
:::

---

### 3.3: Compute Services

#### Amazon EC2 (Elastic Compute Cloud)

**Instance Types** (Remember the pattern):

| Family | Purpose | Example Use Case |
|--------|---------|------------------|
| **General Purpose (T, M)** | Balanced CPU/memory | Web servers, dev environments |
| **Compute Optimized (C)** | High CPU | Batch processing, gaming servers |
| **Memory Optimized (R, X)** | High RAM | Databases, caches |
| **Storage Optimized (I, D, H)** | High I/O | Data warehouses, Hadoop |
| **Accelerated Computing (P, G)** | GPU | Machine learning, graphics |

**Purchasing Options**:
- On-Demand: Pay by hour/second
- Reserved: 1 or 3 year commitment
- Spot: Bid on spare capacity (up to 90% discount)
- Dedicated Hosts: Physical server for compliance

#### AWS Lambda

**Serverless compute service**
- No servers to manage
- Pay only for compute time (per millisecond)
- Automatic scaling
- Event-driven

**Use Cases**:
- ✅ Image processing when uploaded to S3
- ✅ Real-time file processing
- ✅ Data transformation
- ✅ Backends for web/mobile apps

**Limits**:
- ⚠️ Max execution time: 15 minutes
- ⚠️ Max memory: 10 GB

#### Container Services

| Service | Description | When to Use |
|---------|-------------|-------------|
| **Amazon ECS** | AWS-native container orchestration | Run Docker containers on AWS |
| **Amazon EKS** | Managed Kubernetes | Already using Kubernetes |
| **AWS Fargate** | Serverless containers | Don't want to manage servers for containers |

#### AWS Elastic Beanstalk

- **Platform as a Service (PaaS)**
- Deploy applications without managing infrastructure
- Supports: Java, .NET, Node.js, Python, Ruby, Go, Docker
- AWS handles: Capacity provisioning, load balancing, auto-scaling, monitoring

---

### 3.4: Database Services

#### Decision Table: Which Database?

| Requirement | Service | Type |
|-------------|---------|------|
| Traditional SQL database | **Amazon RDS** | Relational |
| MySQL/PostgreSQL compatible, serverless | **Amazon Aurora** | Relational |
| NoSQL, millisecond latency at any scale | **Amazon DynamoDB** | NoSQL |
| In-memory cache (Redis/Memcached) | **Amazon ElastiCache** | Cache |
| Data warehouse, analytics on petabytes | **Amazon Redshift** | Data warehouse |
| MongoDB-compatible | **Amazon DocumentDB** | Document DB |
| Graph database | **Amazon Neptune** | Graph |

#### Amazon RDS (Relational Database Service)

**Supported Engines**:
- MySQL
- PostgreSQL
- MariaDB
- Oracle
- SQL Server
- Amazon Aurora (MySQL/PostgreSQL compatible)

**Benefits**:
- ✅ Automated backups
- ✅ Automated patching
- ✅ Multi-AZ for high availability
- ✅ Read replicas for scalability

**Multi-AZ vs Read Replicas**:

| Feature | Multi-AZ | Read Replicas |
|---------|----------|---------------|
| **Purpose** | High availability | Read scalability |
| **Synchronous** | Yes | No (asynchronous) |
| **Can be in different Region** | No | Yes |
| **Automatic failover** | Yes | No |
| **Can query** | No (standby) | Yes |

#### Amazon DynamoDB

**NoSQL database**
- Key-value and document storage
- Millisecond latency at any scale
- Serverless (auto-scaling)
- Fully managed

**Use Cases**:
- Gaming applications (leaderboards)
- IoT applications
- Mobile apps
- Real-time bidding

---

### 3.5: Networking Services

#### Amazon VPC (Virtual Private Cloud)

**Your own isolated network in AWS**

**Key Components**:
- **Subnets**: Segment your VPC
  - Public subnet: Has internet access
  - Private subnet: No direct internet access
- **Internet Gateway (IGW)**: Allows internet access
- **NAT Gateway**: Allows private subnets to access internet (outbound only)
- **Route Tables**: Control traffic routing
- **Security Groups**: Virtual firewall for instances (stateful)
- **Network ACLs**: Subnet-level firewall (stateless)

::: warning Exam Trap: Security Groups vs NACLs

| Feature | Security Group | Network ACL |
|---------|----------------|-------------|
| **Level** | Instance | Subnet |
| **Stateful** | Yes (return traffic auto-allowed) | No (must explicitly allow return traffic) |
| **Rules** | Allow rules only | Allow and Deny rules |
| **Default** | Deny all inbound | Allow all traffic |
:::

#### Amazon Route 53

**AWS DNS service**
- Register domain names
- Route users to applications
- Health checks

**Routing Policies**:
- **Simple**: Single resource
- **Weighted**: Distribute traffic across resources
- **Latency**: Route to lowest latency
- **Failover**: Active-passive failover
- **Geolocation**: Route based on user location

#### Elastic Load Balancing (ELB)

**Distribute traffic across multiple targets**

**Types**:
1. **Application Load Balancer (ALB)**: HTTP/HTTPS (Layer 7)
2. **Network Load Balancer (NLB)**: TCP/UDP (Layer 4), ultra-low latency
3. **Gateway Load Balancer**: Deploy 3rd-party virtual appliances

#### Amazon CloudFront

**Content Delivery Network (CDN)**
- Cache content at edge locations
- Reduce latency
- DDoS protection
- SSL/TLS encryption

---

### 3.6: Storage Services

#### Decision Table: Which Storage Service?

| Requirement | Service | Type |
|-------------|---------|------|
| Object storage, static websites | **Amazon S3** | Object |
| Archival, long-term backup | **S3 Glacier** | Object (archive) |
| Block storage for EC2 | **Amazon EBS** | Block |
| Shared file storage (Linux) | **Amazon EFS** | File |
| Shared file storage (Windows) | **Amazon FSx** | File |
| Hybrid cloud storage | **AWS Storage Gateway** | Hybrid |

#### Amazon S3 (Simple Storage Service)

**Object storage service**
- Store and retrieve any amount of data
- 11 9's of durability (99.999999999%)
- Buckets (containers) and objects (files)

**Storage Classes**:

| Class | Use Case | Cost | Retrieval Time |
|-------|----------|------|----------------|
| **S3 Standard** | Frequently accessed | $$$$ | Immediate |
| **S3 Intelligent-Tiering** | Unknown/changing access | Auto | Immediate |
| **S3 Standard-IA** | Infrequent access | $$$ | Immediate |
| **S3 One Zone-IA** | Infrequent, non-critical | $$ | Immediate |
| **S3 Glacier Instant Retrieval** | Archive, immediate access | $ | Milliseconds |
| **S3 Glacier Flexible Retrieval** | Archive | $ | Minutes to hours |
| **S3 Glacier Deep Archive** | Long-term archive | ¢ | 12+ hours |

::: tip Exam Pattern
- **Frequently accessed** → S3 Standard
- **Infrequent access** → S3 Standard-IA
- **Archive, rarely accessed** → Glacier
- **Cheapest archive** → Glacier Deep Archive
- **Unknown access pattern** → Intelligent-Tiering
:::

#### Amazon EBS (Elastic Block Store)

**Block storage for EC2 instances**
- Persistent storage (survives instance stop/start)
- Attached to single EC2 instance
- Snapshots for backup

**Volume Types**:
- **gp3/gp2 (SSD)**: General purpose
- **io2/io1 (SSD)**: High performance, databases
- **st1 (HDD)**: Throughput-optimized, big data
- **sc1 (HDD)**: Cold storage, infrequently accessed

#### Amazon EFS (Elastic File System)

**Shared file storage**
- NFS protocol
- Thousands of EC2 instances can access simultaneously
- Elastic (grows/shrinks automatically)
- Linux only

---

### 3.7: AI/ML and Analytics Services

#### AI/ML Services

| Service | Purpose | Example Use Case |
|---------|---------|------------------|
| **Amazon SageMaker** | Build, train, deploy ML models | Custom ML models |
| **Amazon Rekognition** | Image and video analysis | Detect objects, faces in images |
| **Amazon Lex** | Build conversational interfaces | Chatbots |
| **Amazon Polly** | Text-to-speech | Create voiceovers |
| **Amazon Transcribe** | Speech-to-text | Generate captions |
| **Amazon Translate** | Language translation | Translate text |
| **Amazon Comprehend** | Natural language processing | Sentiment analysis |

#### Analytics Services

| Service | Purpose |
|---------|---------|
| **Amazon Athena** | Query S3 data with SQL (serverless) |
| **Amazon Kinesis** | Real-time data streaming |
| **AWS Glue** | ETL service (extract, transform, load) |
| **Amazon QuickSight** | Business intelligence dashboards |
| **Amazon EMR** | Big data processing (Hadoop, Spark) |

---

### 3.8: Other Important Services

#### Application Integration

| Service | Purpose | Pattern |
|---------|---------|---------|
| **Amazon SNS** | Pub/sub messaging | One message to many subscribers |
| **Amazon SQS** | Message queuing | Decouple application components |
| **Amazon EventBridge** | Event bus | Route events between services |

::: tip Exam Pattern
- **Fan-out (1 to many)** → SNS
- **Queue/buffer between services** → SQS
- **Event-driven architecture** → EventBridge
:::

#### Developer Tools

- **AWS CodeCommit**: Git repository
- **AWS CodeBuild**: Build and test code
- **AWS CodeDeploy**: Automated deployments
- **AWS CodePipeline**: CI/CD orchestration

---

## Domain 4: Billing, Pricing, and Support (12%)

### 4.1: Pricing Models

#### EC2 Pricing Comparison

| Model | Commitment | Discount | Flexibility | Use Case |
|-------|------------|----------|-------------|----------|
| **On-Demand** | None | 0% | High | Short-term, unpredictable |
| **Reserved** | 1-3 years | Up to 75% | Low | Steady-state apps |
| **Spot** | None | Up to 90% | Low (can be terminated) | Fault-tolerant workloads |
| **Savings Plans** | 1-3 years | Up to 72% | Medium | Flexible compute usage |

#### Free Tier

**Always Free**:
- Lambda: 1M requests/month
- DynamoDB: 25 GB storage
- SNS: 1M publishes
- CloudWatch: 10 metrics

**12 Months Free**:
- EC2: 750 hours/month (t2.micro or t3.micro)
- S3: 5 GB storage
- RDS: 750 hours/month

**Trials**:
- SageMaker: 2 months
- Redshift: 2 months

---

### 4.2: Cost Management Tools

#### AWS Cost Explorer

- **Purpose**: Visualize and analyze costs
- **Features**:
  - View costs by service, region, tag
  - Forecast future costs
  - Identify cost trends
  - Recommend Reserved Instances

#### AWS Budgets

- **Purpose**: Set custom cost and usage budgets
- **Features**:
  - Email alerts when threshold exceeded
  - Budget types: Cost, usage, Reserved Instance, Savings Plans
  - Multiple alert thresholds

#### AWS Cost and Usage Report

- **Most detailed cost data**
- Export to S3
- Analyze in Athena or QuickSight

#### Consolidated Billing (AWS Organizations)

- **One bill for multiple accounts**
- Volume discounts apply across accounts
- Share Reserved Instances and Savings Plans

::: tip Cost Optimization Strategies
1. ✅ Use Reserved Instances for steady workloads
2. ✅ Rightsize instances (don't over-provision)
3. ✅ Use S3 Intelligent-Tiering
4. ✅ Delete unused EBS volumes and snapshots
5. ✅ Use Auto Scaling
6. ✅ Leverage Spot Instances where appropriate
:::

---

### 4.3: AWS Support Plans

| Plan | Price | Use Case | Response Time | Technical Support |
|------|-------|----------|---------------|-------------------|
| **Basic** | Free | All customers | N/A | None (forums only) |
| **Developer** | $29+/month | Testing/development | 12-24 hours | Business hours email |
| **Business** | $100+/month | Production workloads | 1 hour (urgent) | 24/7 phone, email, chat |
| **Enterprise On-Ramp** | $5,500+/month | Production + mission-critical | 30 minutes | 24/7 + TAM access |
| **Enterprise** | $15,000+/month | Mission-critical | 15 minutes | 24/7 + dedicated TAM |

**TAM = Technical Account Manager** (proactive guidance)

#### AWS Trusted Advisor

**Automated best practice checks**

**5 Categories**:
1. **Cost Optimization**: Idle resources, Reserved Instance recommendations
2. **Performance**: Over/under-utilized resources
3. **Security**: MFA on root, public S3 buckets, security groups
4. **Fault Tolerance**: EBS snapshots, Multi-AZ RDS
5. **Service Limits**: Approaching service quotas

**Access**:
- **Basic/Developer**: 7 core checks
- **Business/Enterprise**: All checks + API access

---

## Quick Reference: Key Service Limits

| Service | Limit | Can Increase? |
|---------|-------|---------------|
| S3 bucket names | Globally unique | N/A |
| EC2 instances per region | 20 (default) | Yes (request) |
| Lambda execution time | 15 minutes max | No |
| Lambda memory | 10 GB max | No |
| S3 object size | 5 TB max | No |
| VPCs per region | 5 (default) | Yes |

---

[← Back to Overview](./index.md) | [← Objectives](./objectives.md) | [Exam Tips →](./exam-tips.md)
