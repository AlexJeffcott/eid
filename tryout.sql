WITH
    user_base AS (
        SELECT
            browser_anonymous_id,
            first_installed,
            date
        FROM (
              SELECT
                  anonymous_id AS browser_anonymous_id,
                  DATE(MIN(received_at)) first_installed,
              FROM
                  `business-intelligence-194510.amboss_browser_extension_production.browser_addon_new_installation`
              WHERE
                      DATE(_PARTITIONTIME) >= "2020-08-10"
              GROUP BY
                  1 ),
             UNNEST(GENERATE_DATE_ARRAY((first_installed), CURRENT_DATE(), INTERVAL 1 DAY)) AS date ),


    p AS (
        SELECT
            anonymous_id,
            received_at,
            context_campaign_term,
            context_campaign_name,
            context_page_path,
            user_id
        FROM
            `business-intelligence-194510.segment_us_legacy.pages`
        WHERE
                DATE(received_at) >= "2020-08-10"
        UNION ALL
        SELECT
            anonymous_id,
            received_at,
            context_campaign_term,
            context_campaign_name,
            context_page_path,
            user_id
        FROM
            `business-intelligence-194510.segment_de_legacy.pages`
        WHERE
                DATE(_PARTITIONTIME) >= "2020-08-10"
          AND DATE(received_at) >= "2020-08-10" ),


    link_to_amboss_user AS (
        SELECT
            p.anonymous_id,
            DATE(received_At) date,
            context_campaign_name,
            IF (context_campaign_term = 'undefined', NULL, context_campaign_term) AS browser_anonymous_id,
            context_page_path,
            COALESCE(p.user_id, ident.user_xid) AS user_id,
            user_guid,
            created_at,
            country_group,
            user_status,
            target_group,
            COUNT(*) counts
        FROM
            p
                LEFT JOIN
            `miamed_bi_test_view.segment_identifies_user_anonymous_id_mat` ident
            ON
                    p.anonymous_id = ident.anonymous_id
                --   AND ident.region = 'us'
                LEFT JOIN
            `miamed_bi_test_view.user_meta_profile_mat` prof
            USING
                (user_guid)
        WHERE
                DATE(received_at) >= "2020-08-10"
          AND context_campaign_name LIKE '%Chrome%'
          -- AND context_campaign_medium = 'browser extension'
        GROUP BY
            1,
            2,
            3,
            4,
            5,
            6,
            7,
            8,
            9,
            10,
            11 ),


    browser_user_activity AS (
        SELECT
            user_base.browser_anonymous_id,
            first_installed,
            date,
            COUNT(DISTINCT browser_action_opened_table.id) browser_action_open_event_count,
            COUNT(DISTINCT tooltip_anchor_hovered.id) tooltip_anchor_hovered,
            AVG(tooltip_anchor_hovered.hover_time)/1000 tooltip_anchor_hovered_avg_time,
            COUNT(DISTINCT tooltip_link_clicked.id) tooltip_link_clicked,
            COUNT(DISTINCT glossary_link_clicked.id) glossary_link_clicked,
            COUNT(DISTINCT options_page_opened.id) options_page_opened
        FROM
            user_base
                LEFT JOIN
            `business-intelligence-194510.amboss_browser_extension_production.browser_addon_browser_action_opened` AS browser_action_opened_table
            ON
                        user_base.browser_anonymous_id = browser_action_opened_table.anonymous_id
                    AND user_base.date = DATE(browser_action_opened_table.received_at)
                    AND DATE(_PARTITIONTIME) >= "2020-08-10"
                LEFT JOIN
            `business-intelligence-194510.amboss_browser_extension_production.browser_addon_tab_tooltip_anchor_hovered` AS tooltip_anchor_hovered
            ON
                        user_base.browser_anonymous_id = tooltip_anchor_hovered.anonymous_id
                    AND user_base.date = DATE(tooltip_anchor_hovered.received_at)
                    AND DATE(tooltip_anchor_hovered._PARTITIONTIME) >= "2020-08-10"
                    AND tooltip_anchor_hovered.hover_time BETWEEN 2000
                            AND 10000
                LEFT JOIN
            `business-intelligence-194510.amboss_browser_extension_production.browser_addon_tab_tooltip_link_clicked` AS tooltip_link_clicked
            ON
                        user_base.browser_anonymous_id = tooltip_link_clicked.anonymous_id
                    AND user_base.date = DATE(tooltip_link_clicked.received_at)
                    AND DATE(tooltip_link_clicked._PARTITIONTIME) >= "2020-08-10"
                LEFT JOIN
            `business-intelligence-194510.amboss_browser_extension_production.browser_addon_options_page_opened` AS options_page_opened
            ON
                        user_base.browser_anonymous_id = options_page_opened.anonymous_id
                    AND user_base.date = DATE(options_page_opened.received_at)
                    AND DATE(options_page_opened._PARTITIONTIME) >= "2020-08-10"
                LEFT JOIN
            `business-intelligence-194510.amboss_browser_extension_production.browser_addon_browser_action_glossary_link_clicked` AS glossary_link_clicked
            ON
                        user_base.browser_anonymous_id = glossary_link_clicked.anonymous_id
                    AND user_base.date = DATE(glossary_link_clicked.received_at)
                    AND DATE(tooltip_link_clicked._PARTITIONTIME) >= "2020-08-10"
        GROUP BY
            1,
            2,
            3 )


SELECT
    DISTINCT link_to_amboss_user.user_guid,
             link_to_amboss_user.created_at,
             link_to_amboss_user.country_group,
             link_to_amboss_user.user_status,
             link_to_amboss_user.target_group AS current_target_group,
             browser_user_activity.*,
             campaign.context_campaign_name,
             campaign.counts AS campaign_counts
FROM
    browser_user_activity
        LEFT JOIN
    link_to_amboss_user campaign
    USING
        (browser_anonymous_id, date)
        LEFT JOIN
    link_to_amboss_user
    USING
        (browser_anonymous_id)
ORDER BY
    user_guid















WITH user_base AS (
    SELECT browser_anonymous_id, first_installed, date
    FROM(
         SELECT
             anonymous_id as browser_anonymous_id, date(min(received_at)) first_installed,
         FROM
             `business-intelligence-194510.amboss_browser_extension_production.browser_addon_new_installation`
         WHERE
                 DATE(_PARTITIONTIME) >= "2020-08-10"
         GROUP BY 1
            ),
        unnest(generate_date_array((first_installed), CURRENT_DATE(),INTERVAL 1 DAY)) AS date
),
     link_to_amboss_user as (
         SELECT
             p.anonymous_id, date(received_At) date,  context_campaign_name,
             IF(context_campaign_term='undefined',null,context_campaign_term) as browser_anonymous_id ,
             context_page_path,
             COALESCE(p.user_id, ident.user_xid) as user_id,
             user_guid,
             created_at,
             country_group,
             user_status,
             target_group,
             count(*) counts
         FROM
             `business-intelligence-194510.segment_us_legacy.pages` AS p
                 LEFT JOIN
             `miamed_bi_test_view.segment_identifies_user_anonymous_id_mat` ident
             ON p.anonymous_id = ident.anonymous_id
                 AND ident.region = 'us'
                 LEFT JOIN
             `miamed_bi_test_view.user_meta_profile_mat` prof
             USING (user_guid)
         WHERE DATE(received_at) >= "2020-08-10"
           AND context_campaign_name  like '%Chrome%'
--     AND context_campaign_medium = 'browser extension'
         GROUP BY 1,2,3,4,5,6,7,8,9,10,11),
     browser_user_activity as (
         SELECT
             user_base.browser_anonymous_id,
             first_installed,
             date,
             count(distinct browser_action_opened_table.id) browser_action_open_event_count,
             count(distinct tooltip_anchor_hovered.id) tooltip_anchor_hovered,
             avg(tooltip_anchor_hovered.hover_time)/1000 tooltip_anchor_hovered_avg_time,
             count(distinct tooltip_link_clicked.id) tooltip_link_clicked,
             count(distinct glossary_link_clicked.id) glossary_link_clicked,
             count(distinct options_page_opened.id) options_page_opened
         FROM
             user_base
                 LEFT JOIN
             `business-intelligence-194510.amboss_browser_extension_production.browser_addon_browser_action_opened` AS browser_action_opened_table
             ON user_base.browser_anonymous_id = browser_action_opened_table.anonymous_id
                 AND user_base.date = date(browser_action_opened_table.received_at)
                 AND DATE(_PARTITIONTIME) >= "2020-08-10"
                 LEFT JOIN
             `business-intelligence-194510.amboss_browser_extension_production.browser_addon_tab_tooltip_anchor_hovered` AS tooltip_anchor_hovered
             ON user_base.browser_anonymous_id = tooltip_anchor_hovered.anonymous_id
                 AND user_base.date = date(tooltip_anchor_hovered.received_at)
                 AND DATE(tooltip_anchor_hovered._PARTITIONTIME) >= "2020-08-10"
                 AND tooltip_anchor_hovered.hover_time between 2000 and 10000
                 LEFT JOIN
             `business-intelligence-194510.amboss_browser_extension_production.browser_addon_tab_tooltip_link_clicked` AS tooltip_link_clicked
             ON user_base.browser_anonymous_id = tooltip_link_clicked.anonymous_id
                 AND user_base.date = date(tooltip_link_clicked.received_at)
                 AND DATE(tooltip_link_clicked._PARTITIONTIME) >= "2020-08-10"
                 LEFT JOIN
             `business-intelligence-194510.amboss_browser_extension_production.browser_addon_options_page_opened` AS options_page_opened
             ON user_base.browser_anonymous_id = options_page_opened.anonymous_id
                 AND user_base.date = date(options_page_opened.received_at)
                 AND DATE(options_page_opened._PARTITIONTIME) >= "2020-08-10"
                 LEFT JOIN
             `business-intelligence-194510.amboss_browser_extension_production.browser_addon_browser_action_glossary_link_clicked` AS glossary_link_clicked
             ON user_base.browser_anonymous_id = glossary_link_clicked.anonymous_id
                 AND user_base.date = date(glossary_link_clicked.received_at)
                 AND DATE(tooltip_link_clicked._PARTITIONTIME) >= "2020-08-10"
         GROUP BY
             1, 2, 3
     )
SELECT distinct
    link_to_amboss_user.user_guid,
    link_to_amboss_user.created_at,
    link_to_amboss_user.country_group,
    link_to_amboss_user.user_status,
    link_to_amboss_user.target_group as current_target_group,
    browser_user_activity.*,
    campaign.context_campaign_name,
    campaign.counts as campaign_counts
FROM browser_user_activity
         LEFT JOIN
     link_to_amboss_user campaign
     USING (browser_anonymous_id,date)
         LEFT JOIN
     link_to_amboss_user
     USING (browser_anonymous_id)
order by user_guid
