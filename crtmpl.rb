File.open('templates.js', 'w') do |f|
  f.write("templates = Array();\n")
  Dir.glob("templates/*.html") do |files|
    files.each do |file_name|
      File.open(file_name, "r") do |file|
        data = file.read.gsub(/\"/, "\\\"")
        data.gsub!(/\n/, '')
        varname = file_name.match(/\w+\/(.*)\.html/)[1]
        f.write("templates['#{varname}'] = \"" + data.to_s + "\";\n")
      end
    end
  end
end