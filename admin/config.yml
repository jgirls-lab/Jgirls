backend:
  name: github
  repo: jgirls-lab/Jgirls
  branch: main
  base_url: https://jgirls.pages.dev
  auth_endpoint: /api/auth
  callback_endpoint: /api/callback

media_folder: images
public_folder: /images

collections:
  - name: gallery
    label: Gallery
    folder: content
    create: true
    slug: "{{slug}}"
    fields:
      - { name: title, label: Title }
      - { name: image, label: Image, widget: image }
      - { name: tags, label: Tags, widget: list }
