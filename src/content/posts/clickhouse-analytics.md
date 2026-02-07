---
title: "ClickHouse for Real-Time Analytics"
date: "2025-09-05"
description: "How we used ClickHouse to build a real-time analytics platform processing billions of events with sub-second query times."
tags: ["ClickHouse", "BigData", "Analytics"]
slug: "clickhouse-analytics"
---

# ClickHouse for Real-Time Analytics

When our PostgreSQL-based analytics started struggling with 100M+ rows and complex aggregation queries taking minutes, we knew it was time for a specialized solution. Enter ClickHouse.

## Why ClickHouse?

ClickHouse is a column-oriented database designed for online analytical processing (OLAP). Key advantages:

- **Blazing fast aggregations**: Column storage means reading only the columns you query, not entire rows.
- **Excellent compression**: Columnar data compresses 5-10x better than row-based storage.
- **SQL-compatible**: No need to learn a new query language.
- **Real-time inserts**: Handles millions of inserts per second.

## Our Architecture

We built a pipeline with three main components:

1. **Event Ingestion**: FastAPI service receives events and buffers them in batches.
2. **Batch Writer**: A background worker inserts batched events into ClickHouse every 5 seconds.
3. **Query API**: FastAPI service translates dashboard queries into optimized ClickHouse SQL.

## Table Design

The key to ClickHouse performance is table design. Use the MergeTree engine family and choose your ORDER BY carefully:

```sql
CREATE TABLE events (
    event_date Date,
    event_time DateTime,
    user_id UInt64,
    event_type LowCardinality(String),
    properties String
) ENGINE = MergeTree()
PARTITION BY toYYYYMM(event_date)
ORDER BY (event_type, user_id, event_time);
```

The ORDER BY clause determines how data is physically sorted on disk — put your most common filter columns first.

## Results

After migrating to ClickHouse:
- Query times dropped from **minutes to milliseconds**
- Storage reduced by **8x** due to compression
- We can now handle **2 billion events** without breaking a sweat

## Conclusion

If you're building analytics on large datasets and need real-time query performance, ClickHouse is an incredible tool. The learning curve is minimal if you already know SQL, and the performance gains are dramatic.
