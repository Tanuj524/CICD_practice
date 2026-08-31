terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 6.0"
    }
  }

  required_version = ">= 1.5.0"
}

provider "aws" {
  region = "ap-south-1"
}

resource "aws_s3_bucket" "practice_bucket" {
  bucket = "terraform-practice123-s3-408766208763"

  tags = {
    Name        = "Terraform Practice Bucket"
    Environment = "Learning"
  }
}