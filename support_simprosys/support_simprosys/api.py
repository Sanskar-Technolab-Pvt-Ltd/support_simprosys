import frappe
from datetime import datetime
import requests

#? Sync Article Data
@frappe.whitelist()
def import_Article_data():
    """
    Fetches article data from the API specified in Article Settings and
    inserts each article as a separate record in the Article doctype.
    """
    doc = frappe.get_doc("Article Settings")

    # Check if api_url is not available or is empty
    if not doc.api_url:
        frappe.msgprint(_("Error: API URL is missing in Article Settings"), indicator="red")
    else:
        furl = doc.api_url
        fetch_limit = doc.fetch_limit or 6
        fetch_limit = int(fetch_limit) 

    # Continue with your logic here if api_url is available
    try:
        # Send the request to the API
        response = requests.get(furl)
        response.raise_for_status()  # Ensure it was successful

        # Get JSON data from the response
        data = response.json()

        # Delete existing Article records before inserting new ones
        frappe.db.sql("DELETE FROM `tabArticle` WHERE docstatus < 2")

        # Iterate over the JSON data and create/update Doctype records
        for entry in data[:fetch_limit]:
            # Access the first category object (safe access with default)
            category = entry.get("category", {})
            
            # If category is a list, take the first item
            if isinstance(category, list):
                category = category[0]  # Safely access the first category

            frappe.logger().info(f"Category Data: {category}")
            
            # Parse and convert date string to Frappe-compatible format
            date_str = entry.get("date")
            if date_str:
                try:
                    date_obj = datetime.strptime(date_str, "%b %d, %Y")
                    frappe_date_str = date_obj.strftime("%Y-%m-%d")
                except ValueError:
                    frappe_date_str = None  # Handle any potential errors
                    frappe.log_error(f"Invalid date format: {date_str}", "Article Import")

            # Create the Article document
            doc = frappe.get_doc({
                "doctype": "Article",
                "url": entry.get("link"),
                "title": entry.get("title"),
                "featured_image": entry.get("featured_image"),
                "new_featured_image": entry.get("fetured_image_new"),
                "description": entry.get("description"),
                "date": frappe_date_str,
                "alt": entry.get("alt"),
                # Fields from the main entry (category data)
                "term_id": category.get("term_id"),
                "name1": category.get("name"),
                "slug": category.get("slug"),
                "term_group": category.get("term_group"),
                "term_taxonomy_id": category.get("term_taxonomy_id"),
                "taxonomy": category.get("taxonomy"),
                "parent1": category.get("parent"),
                "count": category.get("count"),
                "filter": category.get("filter"),
            })

            # Insert the document into Frappe
            doc.insert(ignore_permissions=True)  
            frappe.logger().info(f"Inserted Article for URL: {entry.get('link')}")

        # Commit once all data is inserted
        frappe.db.commit()

        return {"success": True, "message": "Articles imported successfully!"}

    except requests.exceptions.RequestException as e:
        frappe.log_error(f"Error fetching articles: {str(e)}", "Article Import")
        return {"success": False, "message": f"Error fetching articles: {str(e)}"}

    except Exception as e:
        frappe.log_error(f"Unexpected error: {str(e)}", "Article Import")
        return {"success": False, "message": f"Unexpected error: {str(e)}"}



#? Sync Youtube Data  ------------------->
@frappe.whitelist()
def import_Youtube_data():
    # Fetch the single record if it's the only one
    """
    Fetches YouTube data and inserts it into the database.
    
    This function is whitelisted, meaning it can be called from the Frappe client.
    It fetches the YouTube playlist data from the API, and inserts each video
    into the database as a `Simprosys Youtube Data` document. The function
    commits the changes after all data is inserted.

    :return: A dictionary with `success` and `message` keys
    :rtype: dict
    """
    doc = frappe.get_doc("Youtube Settings")
    playlist_id = doc.playlist_id
    api_key = doc.api_key
    results_number = 0
    
    if doc.fetch_limit:
        results_number = doc.fetch_limit
    else:  
        results_number = 6

    furl = f'https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId={playlist_id}&maxResults={results_number}&key={api_key}'

    try:
        # Send the request to the API
        response = requests.get(furl)
        # response.raise_for_status()  # Ensure it was successful

        # Get JSON data from the response
        data = response.json()

        # Debug: Print the entire data
        frappe.db.sql("DELETE FROM `tabSimprosys Youtube Data` WHERE docstatus < 2")

        for entry in data.get("items", []):  # Ensure to iterate over 'items' list
            # Debug: Print each entry to check for missing fields
            print(f"Processing Entry: {entry}")

            snippet = entry.get("snippet", {})
            resourceId = snippet.get("resourceId", {})
            thumbnail = snippet.get("thumbnails", {})

            # Check if 'snippet' has 'title' and 'id' before using them
            title = snippet.get("title")
            id = entry.get("id")
            channel_title = snippet.get("channelTitle")
            video_id = resourceId.get("videoId")
            description = snippet.get("description")
            image = thumbnail.get('standard', {}).get('url', None)
            order = snippet.get("position")
            videoownerchanneltitle = snippet.get("videoOwnerChannelTitle")
            resource_kind = resourceId.get("kind")
            playlist_id = snippet.get("playlistId")
            channel_id = snippet.get("channelId")
            videoownerchannelid = snippet.get("videoOwnerChannelId")
            
            # For Datetime fields
            datetime_str = snippet.get("publishedAt")
            datetime_obj = datetime.strptime(datetime_str[:-1], "%Y-%m-%dT%H:%M:%S")
            frappe_datetime_obj = datetime_obj.strftime("%Y-%m-%d %H:%M:%S")

            # Debug: Log the values being inserted
            print(f"Inserting Data: title={title}, video_id={video_id}, image={image}, order={order}, description={description}")

            # Create and insert the document
            try:
                new_doc = frappe.get_doc({
                    "doctype": "Simprosys Youtube Data",
                    "id": id,
                    "title": title,
                    "channel_title": channel_title,
                    "video_id": video_id,
                    "description": description,
                    "image": image,
                    "order": order,
                    "videoownerchanneltitle": videoownerchanneltitle,
                    "resource_kind": resource_kind,
                    "playlist_id": playlist_id,
                    "channel_id": channel_id,
                    "videoownerchannelid": videoownerchannelid,
                    "published_at":frappe_datetime_obj,
                })

                # Insert the document into the database
                new_doc.insert(ignore_permissions=True)
                frappe.db.commit()  # Commit changes to the database

                # Log the successful insertion
                frappe.logger().info(f"Inserted YouTube Video with ID: {video_id}")

            except Exception as e:
                # Log the error if insert fails
                frappe.logger().error(f"Failed to insert video with ID {video_id}: {e}")

        # Commit once all data is inserted
        frappe.db.commit()

        # Return a success message
        return {"success": True, "message": "Youtube imported successfully!"}
    
    except requests.exceptions.RequestException as e:
        # Log any issues with the API request
        frappe.log_error(f"Error fetching articles: {str(e)}", "Youtube Data Import")
        return {"success": False, "message": f"Error fetching data: {str(e)}"}

    except Exception as e:
        # Log any other errors
        frappe.log_error(f"Unexpected error: {str(e)}", "Youtube Data Import")
        return {"success": False, "message": f"Unexpected error: {str(e)}"}



#? Fetch the data for Searching ------------------------------>
@frappe.whitelist(allow_guest=True)
def search_blog(keyword):
    # Split keyword by spaces to handle multiple words
    keywords = keyword.strip().split()

    # Base query
    base_query = """
        SELECT
            blog.name,
            blog.blog_title,
            blog.post_category,
            blog.slug,
            category3.post_category_name AS third_level_category,
            category2.post_category_name AS second_level_category,
            category1.post_category_name AS first_level_category
        FROM
            `tabSimprosys Blog` AS blog
        INNER JOIN
            `tabSimprosys Post Category` AS category3
                ON blog.post_category = category3.name
        LEFT JOIN
            `tabSimprosys Post Category` AS category2
                ON category3.parent_simprosys_post_category = category2.name
        LEFT JOIN
            `tabSimprosys Post Category` AS category1
                ON category2.parent_simprosys_post_category = category1.name
        WHERE
            blog.status = 'Publish'
            AND category3.status = 'Publish'
            AND (category2.status IS NULL OR category2.status = 'Publish')
            AND (category1.status IS NULL OR category1.status = 'Publish')
    """

    # Add dynamic LIKE clauses for each keyword
    like_clauses = " AND ".join([f"blog.blog_title LIKE %s" for _ in keywords])
    final_query = base_query + f" AND {like_clauses} ORDER BY category1.post_category_name ASC"

    # Prepare parameters
    like_params = [f"%{word}%" for word in keywords]

    blogs = frappe.db.sql(final_query, tuple(like_params), as_dict=True)
    return blogs

    



#? Tree view
@frappe.whitelist()
def get_post_category_tree():
    """
    Builds a tree structure for categories and blogs.

    The function fetches all categories and blogs from the database and
    organizes them into a nested structure. The top-level list contains
    categories which do not have a parent category. Each of these categories
    contains a list of its children, which can be either other categories
    or blogs.

    :return: A list of category dictionaries, each containing the category name
             and a list of its children.
    """
    categories = frappe.get_all(
        "Simprosys Post Category",
        fields=["name", "parent_simprosys_post_category"],
        order_by="name"
    )
    
    # Fetch all blogs
    blogs = frappe.get_all(
        "Simprosys Blog",
        fields=["name", "post_category", "blog_title"],
        order_by="name"
    )

    # Build category tree
    category_dict = {cat.name: {"name": cat.name, "children": []} for cat in categories}

    # Create tree structure for categories
    tree = []
    for cat in categories:
        if cat.parent_simprosys_post_category:
            category_dict[cat.parent_simprosys_post_category]["children"].append(category_dict[cat.name])
        else:
            tree.append(category_dict[cat.name])
    
    # Attach blogs to the correct category level
    for blog in blogs:
        if blog.post_category in category_dict:
            category_dict[blog.post_category]["children"].append({
                "name": blog.name,
                "title": blog.blog_title,
                "type": "blog"
            })
    
    return tree


# ? Trigger Astro Build

# @frappe.whitelist(allow_guest=True)  
# def trigger_astro_build():
#     CLOUDFLARE_DEPLOY_HOOK_URL = "https://api.cloudflare.com/client/v4/pages/webhooks/deploy_hooks/77f17459-87db-496d-b624-9b4298288791"

#     try:
#         response = requests.post(CLOUDFLARE_DEPLOY_HOOK_URL)

#         if response.status_code == 200:
#             return {"status": "success", "message": "Astro build triggered successfully on Cloudflare!"}
#         else:
#             frappe.log_error(f"Cloudflare Build Error: {response.text}", "Trigger Astro Build")
#             return {"status": "error", "message": response.text}

#     except Exception as e:
#         frappe.log_error(f"Cloudflare Build Failed: {str(e)}", "Trigger Astro Build")
#         return {"status": "error", "message": str(e)}



# ? Astro Build on Local
# import requests
# import subprocess

# @frappe.whitelist(allow_guest=True)  # Allow API access
# def trigger_astro_build():
#     try:
#         # Run Astro build command
#         result = subprocess.run(
#             ["npm", "run", "build"],  # Runs npm run build in your Astro project
#             cwd="/home/nil/Downloads/Support-Simprosys-Astro-main",  # Set your Astro project path
#             capture_output=True,
#             text=True
#         )

#         if result.returncode == 0:
#             return {"status": "success", "message": "Astro build completed successfully"}
#         else:
#             frappe.log_error(f"Astro Build Error: {result.stderr}", "Trigger Astro Build")
#             return {"status": "error", "message": result.stderr}

#     except Exception as e:
#         frappe.log_error(f"Astro Build Failed: {str(e)}", "Trigger Astro Build")
#         return {"status": "error", "message": str(e)}


#? Perfect Worked Code for Astro Build In Local Machine
# import os
# import subprocess
# import shutil


# @frappe.whitelist(allow_guest=True)
# def trigger_astro_build():
#     project_dir = "/home/nil/Support-Simprosys-Astro"
#     dist_dir = os.path.join(project_dir, "dist")
#     temp_dist_dir = os.path.join(project_dir, "dist-temp")

#     try:
#         if os.path.exists(temp_dist_dir):
#             shutil.rmtree(temp_dist_dir)

#         # Informative log start
#         frappe.logger().info("Starting Astro build...")

#         result = subprocess.run(
#             ["npm", "run", "build", "--", "--outDir", "dist-temp"],
#             cwd=project_dir,
#             capture_output=True,
#             text=True
#         )

#         if result.returncode != 0:
#             logs = result.stdout + "\n" + result.stderr
#             frappe.log_error(f"Astro Build Error:\n{logs}", "Trigger Astro Build")
#             return {
#                 "status": "error",
#                 "message": "Build failed!",
#                 "logs": logs
#             }

#         if os.path.exists(dist_dir):
#             shutil.rmtree(dist_dir)

#         shutil.move(temp_dist_dir, dist_dir)

#         return {
#             "status": "success",
#             "message": "Astro build completed and deployed successfully",
#             "logs": result.stdout
#         }

#     except Exception as e:
#         frappe.log_error(f"Astro Build Failed: {str(e)}", "Trigger Astro Build")
#         return {"status": "error", "message": str(e), "logs": ""}

        
    
# ! Build.ts
# import { exec } from "child_process";

# export async function POST() {
#   return new Promise((resolve) => {
#     exec("npm run build", { cwd: "/home/nil/Downloads/Support-Simprosys-Astro-main" }, (error, stdout, stderr) => {
#       if (error) {
#         resolve(
#           new Response(JSON.stringify({ status: "error", message: stderr }), {
#             status: 500,
#           })
#         );
#       } else {
#         resolve(
#           new Response(JSON.stringify({ status: "success", message: "Build triggered successfully", output: stdout }), {
#             status: 200,
#           })
#         );
#       }
#     });
#   });
# }
#!------------------------------------------------


# import os
# import shutil
# import subprocess

# @frappe.whitelist()
# def trigger_astro_build_realtime():
#     project_dir = "/home/nil/Support-Simprosys-Astro"
#     dist_dir = os.path.join(project_dir, "dist")
#     temp_dist_dir = os.path.join(project_dir, "dist-temp")

#     def stream_logs(log_line):
#         frappe.publish_realtime("astro_build_logs", {"log": log_line}, user=frappe.session.user)

#     try:
#         if os.path.exists(temp_dist_dir):
#             shutil.rmtree(temp_dist_dir)

#         # Astro Build
#         process = subprocess.Popen(
#             ["npm", "run", "build", "--", "--outDir", "dist-temp"],
#             cwd=project_dir,
#             stdout=subprocess.PIPE,
#             stderr=subprocess.STDOUT,
#             text=True,
#         )

#         for line in iter(process.stdout.readline, ""):
#             if line:
#                 stream_logs(line.strip())

#         process.wait()

#         if process.returncode != 0:
#             stream_logs("🚫 Astro Build Failed.")
#             return {"status": "error", "message": "Astro build failed."}

#         if os.path.exists(dist_dir):
#             shutil.rmtree(dist_dir)

#         shutil.move(temp_dist_dir, dist_dir)

#         # Nginx Test
#         test_nginx = subprocess.run(["sudo", "nginx", "-t"], capture_output=True, text=True)
#         stream_logs(test_nginx.stdout)
#         stream_logs(test_nginx.stderr)

#         if test_nginx.returncode != 0:
#             stream_logs("🚫 Nginx configuration test failed.")
#             return {"status": "error", "message": "Nginx config test failed."}

#         # Nginx Reload
#         reload_nginx = subprocess.run(["sudo", "systemctl", "reload", "nginx"], capture_output=True, text=True)
#         stream_logs(reload_nginx.stdout)
#         stream_logs(reload_nginx.stderr)

#         if reload_nginx.returncode != 0:
#             stream_logs("🚫 Nginx reload failed.")
#             return {"status": "error", "message": "Nginx reload failed."}

#         stream_logs("✅ Build and deploy complete.")
#         return {"status": "success", "message": "Deployed successfully."}

#     except Exception as e:
#         frappe.log_error(str(e), "Astro Build")
#         stream_logs(f"❗ Exception: {str(e)}")
#         return {"status": "error", "message": str(e)}


# import os
# import subprocess
# import shutil
# import frappe

# @frappe.whitelist()
# def trigger_astro_build_realtime():
#     base_dir = frappe.get_app_path("support_simprosys")
#     astro_dir = os.path.abspath(os.path.join(base_dir, "..", "Support-Simprosys-Astro"))
#     dist_dir = os.path.join(base_dir, "public", "astro")
#     temp_dist_dir = os.path.join(astro_dir, "dist-temp")

#     assets_base = os.path.join(base_dir, "public", "support_simprosys", "assets")
#     astro_assets_target = os.path.join(assets_base, "_astro")
#     www_target = os.path.join(base_dir, "www")

#     def stream_logs(log_line):
#         frappe.publish_realtime("astro_build_logs", {"log": log_line}, user=frappe.session.user)

#     try:
#         # Clean previous temp build
#         if os.path.exists(temp_dist_dir):
#             shutil.rmtree(temp_dist_dir)

#         # Run `npm run build -- --outDir dist-temp`
#         process = subprocess.Popen(
#             ["npm", "run", "build", "--", "--outDir", "dist-temp"],
#             cwd=astro_dir,
#             stdout=subprocess.PIPE,
#             stderr=subprocess.STDOUT,
#             text=True,
#         )

#         for line in iter(lambda: process.stdout.readline(), ""):
#             if not line:
#                 break
#             stream_logs(line.strip())

#         process.wait()

#         if process.returncode != 0:
#             stream_logs("🚫 Astro Build Failed.")
#             return {"status": "error", "message": "Astro build failed."}

#         # Replace old dist dir
#         if os.path.exists(dist_dir):
#             shutil.rmtree(dist_dir)
#         shutil.move(temp_dist_dir, dist_dir)

#         # === Copy `_astro` to public/support_simprosys/assets/_astro/ ===
#         src_astro = os.path.join(dist_dir, "_astro")
#         if os.path.exists(src_astro):
#             if os.path.exists(astro_assets_target):
#                 shutil.rmtree(astro_assets_target)
#             os.makedirs(assets_base, exist_ok=True)
#             shutil.copytree(src_astro, astro_assets_target)
#             stream_logs("📁 Copied _astro to public/support_simprosys/assets/_astro/")
#         else:
#             stream_logs("⚠️ No _astro folder found in build output.")

#         # === Copy remaining files to www/ ===
#         if os.path.exists(www_target):
#             for item in os.listdir(www_target):
#                 item_path = os.path.join(www_target, item)
#                 if os.path.isdir(item_path):
#                     shutil.rmtree(item_path)
#                 else:
#                     os.remove(item_path)

#         for item in os.listdir(dist_dir):
#             if item == "_astro":
#                 continue  # already handled
#             src_item = os.path.join(dist_dir, item)
#             dst_item = os.path.join(www_target, item)
#             if os.path.isdir(src_item):
#                 shutil.copytree(src_item, dst_item)
#             else:
#                 shutil.copy2(src_item, dst_item)

#         stream_logs("✅ Build completed and files deployed to assets & www.")
#         return {"status": "success", "message": "Astro build and deployment successful."}

#     except Exception as e:
#         frappe.log_error(str(e), "Astro Build")
#         stream_logs(f"❗ Exception: {str(e)}")
#         return {"status": "error", "message": str(e)}



# import os
# import subprocess
# import shutil
# import frappe

# @frappe.whitelist()
# def trigger_astro_build_realtime():
#     base_dir = frappe.get_app_path("support_simprosys")
#     astro_dir = os.path.abspath(os.path.join(base_dir, "..", "Support-Simprosys-Astro"))
#     dist_dir = os.path.join(base_dir, "public", "astro")
#     temp_dist_dir = os.path.join(astro_dir, "dist-temp")

#     assets_base = os.path.join(base_dir, "public", "support_simprosys", "assets")
#     astro_assets_target = os.path.join(assets_base, "_astro")
#     www_target = os.path.join(base_dir, "www")

#     def stream_logs(log_line):
#         frappe.publish_realtime("astro_build_logs", {"log": log_line}, user=frappe.session.user)

#     try:
#         # Log all paths for debugging
#         frappe.log_error(f"""🔍 Path Debug:
# base_dir: {base_dir}
# astro_dir: {astro_dir}
# dist_dir: {dist_dir}
# temp_dist_dir: {temp_dist_dir}
# assets_base: {assets_base}
# astro_assets_target: {astro_assets_target}
# www_target: {www_target}
# """, "Astro Build Paths")

#         # Clean previous temp build
#         if os.path.exists(temp_dist_dir):
#             shutil.rmtree(temp_dist_dir)
#             stream_logs(f"🧹 Removed previous build folder: {temp_dist_dir}")
#         else:
#             stream_logs(f"ℹ️ No previous temp folder found at: {temp_dist_dir}")

#         # Ensure Astro directory exists
#         if not os.path.exists(astro_dir):
#             error_msg = f"🚫 Astro directory not found: {astro_dir}"
#             frappe.log_error(error_msg, "Astro Build Error")
#             stream_logs(error_msg)
#             return {"status": "error", "message": error_msg}

#         # Run `npm run build -- --outDir dist-temp`
#         process = subprocess.Popen(
#             ["npm", "run", "build", "--", "--outDir", "dist-temp"],
#             cwd=astro_dir,
#             stdout=subprocess.PIPE,
#             stderr=subprocess.STDOUT,
#             text=True,
#         )

#         for line in iter(lambda: process.stdout.readline(), ""):
#             if not line:
#                 break
#             stream_logs(line.strip())

#         process.wait()

#         if process.returncode != 0:
#             error_msg = "🚫 Astro Build Failed."
#             stream_logs(error_msg)
#             return {"status": "error", "message": error_msg}

#         # Replace old dist dir
#         if os.path.exists(dist_dir):
#             shutil.rmtree(dist_dir)
#             stream_logs(f"🔁 Removed old dist directory: {dist_dir}")
#         shutil.move(temp_dist_dir, dist_dir)
#         stream_logs(f"✅ Moved build to: {dist_dir}")

#         # === Copy `_astro` to assets ===
#         src_astro = os.path.join(dist_dir, "_astro")
#         if os.path.exists(src_astro):
#             if os.path.exists(astro_assets_target):
#                 shutil.rmtree(astro_assets_target)
#             os.makedirs(assets_base, exist_ok=True)
#             shutil.copytree(src_astro, astro_assets_target)
#             stream_logs(f"📁 Copied _astro to {astro_assets_target}")
#         else:
#             stream_logs(f"⚠️ No _astro folder found in: {src_astro}")

#         # === Copy remaining files to www ===
#         if os.path.exists(www_target):
#             for item in os.listdir(www_target):
#                 item_path = os.path.join(www_target, item)
#                 if os.path.isdir(item_path):
#                     shutil.rmtree(item_path)
#                 else:
#                     os.remove(item_path)
#             stream_logs("🧹 Cleaned www directory")

#         for item in os.listdir(dist_dir):
#             if item == "_astro":
#                 continue  # already handled
#             src_item = os.path.join(dist_dir, item)
#             dst_item = os.path.join(www_target, item)
#             if os.path.isdir(src_item):
#                 shutil.copytree(src_item, dst_item)
#             else:
#                 shutil.copy2(src_item, dst_item)

#         stream_logs("✅ Build completed and files deployed to assets & www.")
#         return {"status": "success", "message": "Astro build and deployment successful."}

#     except Exception as e:
#         err_message = f"❗ Exception during build: {str(e)}"
#         frappe.log_error(f"{err_message}\n\nVariable Info:\n"
#                          f"base_dir = {base_dir}\n"
#                          f"astro_dir = {astro_dir}\n"
#                          f"dist_dir = {dist_dir}\n"
#                          f"temp_dist_dir = {temp_dist_dir}\n"
#                          f"assets_base = {assets_base}\n"
#                          f"astro_assets_target = {astro_assets_target}\n"
#                          f"www_target = {www_target}\n",
#                          "Astro Build Fatal Error")
#         stream_logs(err_message)
#         return {"status": "error", "message": err_message}


# import os
# import subprocess
# import shutil
# import frappe

# @frappe.whitelist()
# def trigger_astro_build_realtime():
#     base_dir = frappe.get_app_path("support_simprosys")
#     astro_dir = os.path.abspath(os.path.join(base_dir, "..", "Support-Simprosys-Astro"))
#     dist_dir = os.path.join(base_dir, "public", "astro")
#     temp_dist_dir = os.path.join(astro_dir, "dist-temp")

#     assets_base = os.path.join(base_dir, "public", "support_simprosys", "assets")
#     astro_assets_target = os.path.join(assets_base, "_astro")
#     www_target = os.path.join(base_dir, "www")

#     def stream_logs(log_line):
#         frappe.publish_realtime("astro_build_logs", {"log": log_line}, user=frappe.session.user)

#     try:
#         # Log important paths
#         frappe.log_error(f"""🔍 Path Debug:
# base_dir: {base_dir}
# astro_dir: {astro_dir}
# dist_dir: {dist_dir}
# temp_dist_dir: {temp_dist_dir}
# assets_base: {assets_base}
# astro_assets_target: {astro_assets_target}
# www_target: {www_target}
# """, "Astro Build Paths")

#         # Ensure Astro directory exists
#         if not os.path.exists(astro_dir):
#             error_msg = f"🚫 Astro directory not found: {astro_dir}"
#             frappe.log_error(error_msg, "Astro Build Error")
#             stream_logs(error_msg)
#             return {"status": "error", "message": error_msg}

#         # Clean previous temp build
#         if os.path.exists(temp_dist_dir):
#             shutil.rmtree(temp_dist_dir)
#             stream_logs(f"🧹 Removed previous build folder: {temp_dist_dir}")

#         # --- Run `npm install` ---
#         stream_logs("📦 Running `npm install`...")
#         install_process = subprocess.Popen(
#             ["npm", "install"],
#             cwd=astro_dir,
#             stdout=subprocess.PIPE,
#             stderr=subprocess.STDOUT,
#             text=True,
#         )
#         for line in iter(lambda: install_process.stdout.readline(), ""):
#             if not line:
#                 break
#             stream_logs(f"[install] {line.strip()}")

#         install_process.wait()
#         if install_process.returncode != 0:
#             stream_logs("🚫 `npm install` failed.")
#             return {"status": "error", "message": "`npm install` failed."}
#         stream_logs("✅ `npm install` completed.")

#         # --- Run `npm run build` ---
#         stream_logs("🚀 Starting Astro build...")
#         build_process = subprocess.Popen(
#             ["npm", "run", "build", "--", "--outDir", "dist-temp"],
#             cwd=astro_dir,
#             stdout=subprocess.PIPE,
#             stderr=subprocess.STDOUT,
#             text=True,
#         )
#         for line in iter(lambda: build_process.stdout.readline(), ""):
#             if not line:
#                 break
#             stream_logs(f"[build] {line.strip()}")

#         build_process.wait()
#         if build_process.returncode != 0:
#             stream_logs("🚫 Astro Build Failed.")
#             return {"status": "error", "message": "Astro build failed."}

#         # Replace old dist dir
#         if os.path.exists(dist_dir):
#             shutil.rmtree(dist_dir)
#             stream_logs(f"🔁 Removed old dist directory: {dist_dir}")
#         shutil.move(temp_dist_dir, dist_dir)
#         stream_logs(f"✅ Moved build to: {dist_dir}")

#         # === Copy `_astro` to assets ===
#         src_astro = os.path.join(dist_dir, "_astro")
#         if os.path.exists(src_astro):
#             if os.path.exists(astro_assets_target):
#                 shutil.rmtree(astro_assets_target)
#             os.makedirs(assets_base, exist_ok=True)
#             shutil.copytree(src_astro, astro_assets_target)
#             stream_logs(f"📁 Copied _astro to {astro_assets_target}")
#         else:
#             stream_logs(f"⚠️ No _astro folder found in: {src_astro}")

#         # === Copy remaining files to www ===
#         if os.path.exists(www_target):
#             for item in os.listdir(www_target):
#                 item_path = os.path.join(www_target, item)
#                 if os.path.isdir(item_path):
#                     shutil.rmtree(item_path)
#                 else:
#                     os.remove(item_path)
#             stream_logs("🧹 Cleaned www directory")

#         for item in os.listdir(dist_dir):
#             if item == "_astro":
#                 continue  # already handled
#             src_item = os.path.join(dist_dir, item)
#             dst_item = os.path.join(www_target, item)
#             if os.path.isdir(src_item):
#                 shutil.copytree(src_item, dst_item)
#             else:
#                 shutil.copy2(src_item, dst_item)

#         stream_logs("✅ Build completed and files deployed to assets & www.")
#         return {"status": "success", "message": "Astro build and deployment successful."}

#     except Exception as e:
#         err_message = f"❗ Exception during build: {str(e)}"
#         frappe.log_error(f"{err_message}\n\nVariable Info:\n"
#                          f"base_dir = {base_dir}\n"
#                          f"astro_dir = {astro_dir}\n"
#                          f"dist_dir = {dist_dir}\n"
#                          f"temp_dist_dir = {temp_dist_dir}\n"
#                          f"assets_base = {assets_base}\n"
#                          f"astro_assets_target = {astro_assets_target}\n"
#                          f"www_target = {www_target}\n",
#                          "Astro Build Fatal Error")
#         stream_logs(err_message)
#         return {"status": "error", "message": err_message}


# * Currently running code -------------->

# import subprocess
# import os
# import shutil
# from pathlib import Path
# import frappe

# @frappe.whitelist()
# def trigger_astro_build_realtime():
#     base_dir = frappe.get_app_path("support_simprosys")
#     astro_dir = os.path.abspath(os.path.join(base_dir, "..", "Support-Simprosys-Astro"))
#     dist_dir = os.path.join(base_dir, "public", "astro")
#     temp_dist_dir = os.path.join(astro_dir, "dist-temp")

#     assets_base = os.path.join(base_dir, "public", "support_simprosys", "assets")
#     astro_assets_target = os.path.join(assets_base, "_astro")
#     www_target = os.path.join(base_dir, "www")

#     def stream_logs(log_line):
#         frappe.publish_realtime("astro_build_logs", {"log": log_line}, user=frappe.session.user)

#     try:
#         # Log important paths
#         frappe.log_error(f"""🔍 Path Debug:
# base_dir: {base_dir}
# astro_dir: {astro_dir}
# dist_dir: {dist_dir}
# temp_dist_dir: {temp_dist_dir}
# assets_base: {assets_base}
# astro_assets_target: {astro_assets_target}
# www_target: {www_target}
# """, "Astro Build Paths")

#         # Dynamically determine the bench path
#         bench_path = Path(__file__).resolve().parents[2]  # Adjust the level as needed
#         bench_path = os.path.join(bench_path, 'frappe-bench')  # Adjust the bench folder name if necessary

#         # Ensure Astro directory exists
#         if not os.path.exists(astro_dir):
#             error_msg = f"🚫 Astro directory not found: {astro_dir}"
#             frappe.log_error(error_msg, "Astro Build Error")
#             stream_logs(error_msg)
#             return {"status": "error", "message": error_msg}

#         # Clean previous temp build
#         if os.path.exists(temp_dist_dir):
#             shutil.rmtree(temp_dist_dir)
#             stream_logs(f"🧹 Removed previous build folder: {temp_dist_dir}")

#         # --- Run `npm install` ---
#         stream_logs("📦 Running `npm install`...")
#         install_process = subprocess.Popen(
#             ["npm", "install"],
#             cwd=astro_dir,
#             stdout=subprocess.PIPE,
#             stderr=subprocess.STDOUT,
#             text=True,
#         )
#         for line in iter(lambda: install_process.stdout.readline(), ""):
#             if not line:
#                 break
#             stream_logs(f"[install] {line.strip()}")

#         install_process.wait()
#         if install_process.returncode != 0:
#             stream_logs("🚫 `npm install` failed.")
#             return {"status": "error", "message": "`npm install` failed."}
#         stream_logs("✅ `npm install` completed.")

#         # --- Run `npm run build` ---
#         stream_logs("🚀 Starting Astro build...")
#         build_process = subprocess.Popen(
#             ["npm", "run", "build", "--", "--outDir", "dist-temp"],
#             cwd=astro_dir,
#             stdout=subprocess.PIPE,
#             stderr=subprocess.STDOUT,
#             text=True,
#         )
#         for line in iter(lambda: build_process.stdout.readline(), ""):
#             if not line:
#                 break
#             stream_logs(f"[build] {line.strip()}")

#         build_process.wait()
#         if build_process.returncode != 0:
#             stream_logs("🚫 Astro Build Failed.")
#             return {"status": "error", "message": "Astro build failed."}

#         # Replace old dist dir
#         if os.path.exists(dist_dir):
#             shutil.rmtree(dist_dir)
#             stream_logs(f"🔁 Removed old dist directory: {dist_dir}")
#         shutil.move(temp_dist_dir, dist_dir)
#         stream_logs(f"✅ Moved build to: {dist_dir}")

#         # === Copy `_astro` to assets ===
#         src_astro = os.path.join(dist_dir, "_astro")
#         if os.path.exists(src_astro):
#             if os.path.exists(astro_assets_target):
#                 shutil.rmtree(astro_assets_target)
#             os.makedirs(assets_base, exist_ok=True)
#             shutil.copytree(src_astro, astro_assets_target)
#             stream_logs(f"📁 Copied _astro to {astro_assets_target}")
#         else:
#             stream_logs(f"⚠️ No _astro folder found in: {src_astro}")

#         # === Copy remaining files to www ===
#         if os.path.exists(www_target):
#             for item in os.listdir(www_target):
#                 item_path = os.path.join(www_target, item)
#                 if os.path.isdir(item_path):
#                     shutil.rmtree(item_path)
#                 else:
#                     os.remove(item_path)
#             stream_logs("🧹 Cleaned www directory")

#         for item in os.listdir(dist_dir):
#             if item == "_astro":
#                 continue  # already handled
#             src_item = os.path.join(dist_dir, item)
#             dst_item = os.path.join(www_target, item)
#             if os.path.isdir(src_item):
#                 shutil.copytree(src_item, dst_item)
#             else:
#                 shutil.copy2(src_item, dst_item)

#         stream_logs("✅ Build completed and files deployed to assets & www.")

#          # === Run bench clear-cache ===
#         # === Run bench --site all clear-cache ===
#         stream_logs("🧹 Running `bench --site all clear-cache`...")
#         cache_process = subprocess.run(
#             ["bench", "--site", "all", "clear-cache"],
#             cwd="/home/frappe/frappe-bench/",
#             stdout=subprocess.PIPE,
#             stderr=subprocess.STDOUT,
#             text=True,
#         )
#         stream_logs(cache_process.stdout)

#         # === Run bench --site all clear-website-cache ===
#         stream_logs("🧼 Running `bench --site all clear-website-cache`...")
#         website_cache_process = subprocess.run(
#             ["bench", "--site", "all", "clear-website-cache"],
#             cwd="/home/frappe/frappe-bench/",
#             stdout=subprocess.PIPE,
#             stderr=subprocess.STDOUT,
#             text=True,
#         )
#         stream_logs(website_cache_process.stdout)


#         stream_logs("✅ All steps completed successfully.")
#         return {"status": "success", "message": "Astro build, deployment, and cache clearing completed."}

#     except Exception as e:
#         err_message = f"❗ Exception during build: {str(e)}"
#         frappe.log_error(f"{err_message}\n\nVariable Info:\n"
#                          f"base_dir = {base_dir}\n"
#                          f"astro_dir = {astro_dir}\n"
#                          f"dist_dir = {dist_dir}\n"
#                          f"temp_dist_dir = {temp_dist_dir}\n"
#                          f"assets_base = {assets_base}\n"
#                          f"astro_assets_target = {astro_assets_target}\n"
#                          f"www_target = {www_target}\n",
#                          "Astro Build Fatal Error")
#         stream_logs(err_message)
#         return {"status": "error", "message": err_message}

#  * ---------------------------------------------

@frappe.whitelist()
def get_current_build_log():
    log = frappe.get_all(
        "Astro Build Logs",
        filters={"status": "Processing"},
        order_by="creation desc",
        limit_page_length=1,
        fields=["name", "logs", "status"]
    )
    return log[0] if log else None


from datetime import datetime
import os
import shutil
import subprocess
import frappe

def create_astro_build_log(user):
    """Create a single log entry for this build session."""
    log = frappe.get_doc({
        "doctype": "Astro Build Logs",
        "user": user,
        "status": "Processing",
        "message": "Build started",
        "date_and_time": datetime.now(),
        "logs": "🚀 Build initiated...\n"
    })
    log.insert(ignore_permissions=True)
    return log.name  # Return the log name (ID)

@frappe.whitelist()
def trigger_astro_build_realtime():
    user = frappe.session.user

    # 🚨 Check for existing processing builds
    existing_build = frappe.db.exists(
        "Astro Build Logs",
        {"status": "Processing"}
    )
    if existing_build:
        return {
            "status": "in_progress",
            "message": "A build is already in progress. Please wait until it completes."
        }

    log_id = create_astro_build_log(user)  # create only once

    base_dir = frappe.get_app_path("support_simprosys")
    astro_dir = os.path.abspath(os.path.join(base_dir, "..", "Support-Simprosys-Astro"))
    dist_dir = os.path.join(base_dir, "public", "astro")
    temp_dist_dir = os.path.join(astro_dir, "dist-temp")

    assets_base = os.path.join(base_dir, "public", "support_simprosys", "assets")
    astro_assets_target = os.path.join(assets_base, "_astro")
    www_target = os.path.join(base_dir, "www")

    def update_log(msg, status=None):
        frappe.publish_realtime("astro_build_logs", {"log": msg}, user=user)

        log = frappe.get_doc("Astro Build Logs", log_id)

        if not log.logs:
            log.logs = msg
        else:
            log.logs += f"\n{msg}"

        log.message = msg
        log.date_and_time = datetime.now()
        if status:
            log.status = status
        log.save(ignore_permissions=True)

        frappe.db.commit()

    try:
        update_log("📦 Running npm install...")
        install_process = subprocess.Popen(["npm", "install"], cwd=astro_dir, stdout=subprocess.PIPE, stderr=subprocess.STDOUT, text=True)
        for line in install_process.stdout:
            update_log(f"[install] {line.strip()}")
        install_process.wait()

        if install_process.returncode != 0:
            update_log("🚫 npm install failed.", status="Failed")
            return {"status": "error", "message": "npm install failed."}

        update_log("✅ npm install completed.")

        update_log("🚀 Running npm run build...")
        build_process = subprocess.Popen(["npm", "run", "build", "--", "--outDir", "dist-temp"], cwd=astro_dir, stdout=subprocess.PIPE, stderr=subprocess.STDOUT, text=True)
        for line in build_process.stdout:
            update_log(f"[build] {line.strip()}")
        build_process.wait()

        if build_process.returncode != 0:
            update_log("🚫 Astro build failed.", status="Failed")
            return {"status": "error", "message": "Astro build failed."}

        update_log("✅ Astro build completed.")

        if os.path.exists(dist_dir):
            shutil.rmtree(dist_dir)
        shutil.move(temp_dist_dir, dist_dir)

        if os.path.exists(os.path.join(dist_dir, "_astro")):
            if os.path.exists(astro_assets_target):
                shutil.rmtree(astro_assets_target)
            shutil.copytree(os.path.join(dist_dir, "_astro"), astro_assets_target)

        if os.path.exists(www_target):
            for item in os.listdir(www_target):
                path = os.path.join(www_target, item)
                shutil.rmtree(path) if os.path.isdir(path) else os.remove(path)

        for item in os.listdir(dist_dir):
            if item != "_astro":
                src = os.path.join(dist_dir, item)
                dst = os.path.join(www_target, item)
                shutil.copytree(src, dst) if os.path.isdir(src) else shutil.copy2(src, dst)

        subprocess.run(["bench", "--site", "all", "clear-cache"], cwd="/home/frappe/frappe-bench")
        subprocess.run(["bench", "--site", "all", "clear-website-cache"], cwd="/home/frappe/frappe-bench")

        update_log("✅ All steps completed successfully.", status="Success")
        return {"status": "success", "message": "Build finished successfully."}

    except Exception as e:
        update_log(f"❗ Exception: {str(e)}", status="Failed")
        frappe.log_error(str(e), "Astro Build Error")
        return {"status": "error", "message": str(e)}
    


@frappe.whitelist(allow_guest=True)
def get_blog_by_slug(slug):
    if not slug:
        return {"error": "Slug is required"}

    blog = frappe.get_all("Simprosys Blog",
        filters={"slug": slug},
        fields=["name", "slug", "post_category", "blog_title", "content_details"]
    )

    if not blog:
        return {"error": "Blog not found"}

    return blog[0]


# ? Ticket Email
import frappe
from frappe.email.queue import flush

# def send_support_ticket_email(docname):
#     doc = frappe.get_doc("Support Simprosys Ticket", docname)

#     subject = "Support Simprosys Ticket - "

#     ticket_id_row = ""
#     if doc.plugin_or_app_related_queries in ["Career opportunities", "Partnership opportunities"]:
#         ticket_id_row = f"""
#         <tr>
#             <td><strong>Ticket ID</strong></td>
#             <td>{doc.name}</td>
#         </tr>
#         """

#     platform_app_row = ""
#     if doc.plugin_or_app_related_queries == "Plugin and App related query":
#         platform_app_row = f"""
#         <tr>
#             <td><strong>Platform</strong></td>
#             <td>{doc.platform}</td>
#         </tr>
#         <tr>
#             <td><strong>App</strong></td>
#             <td>{doc.app}</td>
#         </tr>
#         """

#     content = f"""
#     <html>
#     <body>
#         <p>Hello,</p>
#         <p>A new Support Simprosys Ticket has been raised.</p>
        
#         <table border="1" cellspacing="0" cellpadding="8" style="border-collapse: collapse; width: 100%;">
#             <tr>
#                 <th style="background-color: #f2f2f2;">Field</th>
#                 <th style="background-color: #f2f2f2;">Value</th>
#             </tr>
#             {ticket_id_row}
#             <tr><td><strong>Name</strong></td><td>{doc.name1}</td></tr>
#             <tr><td><strong>Company Name</strong></td><td>{doc.company_name}</td></tr>
#             <tr><td><strong>Store URL</strong></td><td><a href="{doc.store_url}" target="_blank">{doc.store_url}</a></td></tr>
#             <tr><td><strong>Reason</strong></td><td>{doc.plugin_or_app_related_queries}</td></tr>
#             {platform_app_row}
#             <tr><td><strong>Email</strong></td><td>{doc.email}</td></tr>
#             <tr><td><strong>Store ID</strong></td><td>{doc.store_id}</td></tr>
#             <tr><td><strong>Additional Details</strong></td><td>{doc.additional_details}</td></tr>
#         </table>

#         <p>Please take appropriate action.</p>
#         <p>Thanks,<br>Support Simprosys</p>
#     </body>
#     </html>
#     """

#     recipients_email = None
#     if doc.plugin_or_app_related_queries == "Career opportunities":
#         # recipients_email = ["careers@simprosys.com"]
#         recipients_email = ["nil@sanskartechnolab.com"]
#     elif doc.plugin_or_app_related_queries == "Partnership opportunities":
#         # recipients_email = ["partnerships@simprosys.com"]
#         recipients_email = ["nil@sanskartechnolab.com"]
#     else:
#         # recipients_email = ["support@simprosys.com"]
#         recipients_email = ["nil@sanskartechnolab.com"]


#     attachments = []
#     attached_files = frappe.get_all(
#         "File",
#         filters={
#             "attached_to_doctype": doc.doctype,
#             "attached_to_name": doc.name
#         },
#         fields=["name", "file_name", "file_url"]
#     )

#     for file in attached_files:
#         file_doc = frappe.get_doc("File", file.name)
#         attachments.append({
#             "fname": file_doc.file_name,
#             "fcontent": file_doc.get_content()
#         })

#     if recipients_email:
#         frappe.sendmail(
#             recipients=recipients_email,
#             subject=subject,
#             message=content,
#             attachments=attachments
#         )
#         flush()


import frappe
from frappe.utils import get_url

@frappe.whitelist(allow_guest=True)
def send_support_ticket_email(docname):
    doc = frappe.get_doc("Support Simprosys Ticket", docname)

    subject = "Support Simprosys Ticket - "

    # Conditional fields
    ticket_id_row = ""
    if doc.plugin_or_app_related_queries in ["Career opportunities", "Partnership opportunities"]:
        ticket_id_row = f"""
        <tr>
            <td><strong>Ticket ID</strong></td>
            <td>{doc.name}</td>
        </tr>
        """

    platform_app_row = ""
    if doc.plugin_or_app_related_queries == "Plugin and App related query":
        platform_app_row = f"""
        <tr>
            <td><strong>Platform</strong></td>
            <td>{doc.platform}</td>
        </tr>
        <tr>
            <td><strong>App</strong></td>
            <td>{doc.app}</td>
        </tr>
        """

    # Get attached files
    attached_files = frappe.get_all(
        "File",
        filters={
            "attached_to_doctype": doc.doctype,
            "attached_to_name": doc.name
        },
        fields=["name", "file_name", "file_url"]
    )

    # For email attachments
    attachments = []
    for file in attached_files:
        file_doc = frappe.get_doc("File", file.name)
        attachments.append({
            "fname": file_doc.file_name,
            "fcontent": file_doc.get_content()
        })

    # For display in email
    attachment_names = "<br>".join([f"https://simprosys.frappe.cloud/files/{file['file_name']}" for file in attached_files]) if attached_files else "No Attachments"
    attachments_row = f"""
    <tr>
        <td><strong>Attachments</strong></td>
        <td>{attachment_names}</td>
    </tr>
    """

    # Email body
    content = f"""
    <html>
    <body>
        <p>Hello,</p>
        <p>A new Support Simprosys Ticket has been raised.</p>
        
        <table border="1" cellspacing="0" cellpadding="8" style="border-collapse: collapse; width: 100%;">
            <tr>
                <th style="background-color: #f2f2f2; width: 50%;">Field</th>
                <th style="background-color: #f2f2f2; width: 50%;">Value</th>
            </tr>
            {ticket_id_row.replace('<td>', '<td style="width: 50%;">')}
            <tr><td style="width: 50%;"><strong>Name</strong></td><td style="width: 50%;">{doc.name1}</td></tr>
            <tr><td style="width: 50%;"><strong>Company Name</strong></td><td style="width: 50%;">{doc.company_name}</td></tr>
            <tr><td style="width: 50%;"><strong>Store URL</strong></td><td style="width: 50%;"><a href="{doc.store_url}" target="_blank">{doc.store_url}</a></td></tr>
            <tr><td style="width: 50%;"><strong>Reason</strong></td><td style="width: 50%;">{doc.plugin_or_app_related_queries}</td></tr>
            {platform_app_row.replace('<td>', '<td style="width: 50%;">')}
            <tr><td style="width: 50%;"><strong>Email</strong></td><td style="width: 50%;">{doc.email}</td></tr>
            <tr><td style="width: 50%;"><strong>Store ID</strong></td><td style="width: 50%;">{doc.store_id}</td></tr>
            <tr><td style="width: 50%;"><strong>Additional Details</strong></td><td style="width: 50%;">{doc.additional_details}</td></tr>
            {attachments_row.replace('<td>', '<td style="width: 50%;">')}
        </table>

        <p>Please take appropriate action.</p>
        <p>Thanks,<br>Support Simprosys</p>
    </body>
    </html>
    """

    recipients_email = None
    if doc.plugin_or_app_related_queries == "Career opportunities":
        # recipients_email = ["careers@simprosys.com"]
        recipients_email = ["nil@sanskartechnolab.com"]
    elif doc.plugin_or_app_related_queries == "Partnership opportunities":
        # recipients_email = ["partnerships@simprosys.com"]
        recipients_email = ["nil@sanskartechnolab.com"]
    else:
        # recipients_email = ["support@simprosys.com"]
        recipients_email = ["nil@sanskartechnolab.com"]

    if recipients_email:
        frappe.sendmail(
            recipients=recipients_email,
            subject=subject,
            message=content,
            attachments=attachments
        )

    # Save full URLs in attachment_urls field (one per line)
    doc.attachment_urls = "\n".join([
        get_url(file["file_url"]) for file in attached_files
    ])
    doc.save(ignore_permissions=True)
    flush()