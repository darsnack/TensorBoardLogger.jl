var documenterSearchIndex = {"docs":
[{"location":"extending_behaviour/#Extending-TensorBoardLogger-1","page":"Extending","title":"Extending TensorBoardLogger","text":"","category":"section"},{"location":"extending_behaviour/#","page":"Extending","title":"Extending","text":"It is possible to change TensorBoardLogger's behaviour when logging specific types. Internally, when an object o::T is logged to TensorBoard with the tag name, the function preprocess(name, val, objects) is called, with objects being an iterable collection of Pair{String,Any}.","category":"page"},{"location":"extending_behaviour/#","page":"Extending","title":"Extending","text":"The preprocess function is responsible for converting o to or more objects of simpler types, and pushing them with their tag to the objects collection.","category":"page"},{"location":"extending_behaviour/#","page":"Extending","title":"Extending","text":"At the end of this step, every pair in objects will be logged to a specific backend, according to the following rules:","category":"page"},{"location":"extending_behaviour/#","page":"Extending","title":"Extending","text":"::AbstractVector{<:Real} -> Histogram backend as a vector\n::Tuple{AbstractVector,AbstractVector} Histogram backend as an histogram\n::Real -> Scalar backend\n::AbstractArray{<:Colorant} -> Image backend\n::Any -> Text Backend","category":"page"},{"location":"extending_behaviour/#","page":"Extending","title":"Extending","text":"To achieve that, preprocess(name, o::T, obj) calls recursively into itself with simpler types. For example, complex numbers are converted to the real and imaginary part by the following function:","category":"page"},{"location":"extending_behaviour/#","page":"Extending","title":"Extending","text":"preprocess(name, val::Complex, data) = push!(data, name*\"/re\"=>real(val), name*\"/im\"=>imag(val))","category":"page"},{"location":"extending_behaviour/#","page":"Extending","title":"Extending","text":"To give an example, consider the following structure representing a quantity","category":"page"},{"location":"extending_behaviour/#","page":"Extending","title":"Extending","text":"struct LinkedQuantities\n  name_1::String\n  val_1\n  name_2::String\n  val_2\nend\n\ncost_fun = LinkedQuantities(\"Loss\", 0.5+0.1im, \"Loss_Variance\", 0.01+0.02im)","category":"page"},{"location":"extending_behaviour/#","page":"Extending","title":"Extending","text":"and consider that you want to log objects of this type so that it logs val_1 with the tag name_1 and val_2 with tag name_2. To achieve that, one defines","category":"page"},{"location":"extending_behaviour/#","page":"Extending","title":"Extending","text":"function preprocess(name, val::LinkedQuantities, data)\n  preprocess(val.name_1, val.val_1, data)\n  preprocess(val.name_2, val.val_2, data)\nend","category":"page"},{"location":"custom_behaviour/#Specifying-a-backend-1","page":"Backends","title":"Specifying a backend","text":"","category":"section"},{"location":"custom_behaviour/#","page":"Backends","title":"Backends","text":"By default TensorBoardLogger follows those rules to chose what backend a certain value is sent to:","category":"page"},{"location":"custom_behaviour/#","page":"Backends","title":"Backends","text":"::AbstractVector{<:Real} -> Histogram backend as a vector\n::Tuple{AbstractVector,AbstractVector} Histogram backend as an histogram\n::Real -> Scalar backend\n::AbstractArray{<:Colorant} -> Image backend\n::Any -> Text Backend","category":"page"},{"location":"custom_behaviour/#","page":"Backends","title":"Backends","text":"In addition, structures are not logged to text, but rather all their fields are (recursively) dispatched according to the rules above.","category":"page"},{"location":"custom_behaviour/#","page":"Backends","title":"Backends","text":"If you want to override those defaults, or you wish to specify some additional details, you can wrap any object into one of the following wrappers:","category":"page"},{"location":"custom_behaviour/#","page":"Backends","title":"Backends","text":"TBText   -> sends data to Text backend\nTBAudio, TBAudios -> sends data to audio backend\nTBHistogram, TBVector -> sends data to the Distributions backend, either as an histogram or as a vector\nTBImage, TBImages -> Sends data to the images backend","category":"page"},{"location":"custom_behaviour/#","page":"Backends","title":"Backends","text":"To use those overrides, you simply wrap your type. Some overrides require additional parameters. For example, to log a vector as text you can do the following:","category":"page"},{"location":"custom_behaviour/#","page":"Backends","title":"Backends","text":"@info \"mytag\" TBText([1,2,3])","category":"page"},{"location":"custom_behaviour/#","page":"Backends","title":"Backends","text":"TBText\nTBHistogram\nTBVector\nTBAudio\nTBAudios\nTBImage\nTBImages","category":"page"},{"location":"custom_behaviour/#TensorBoardLogger.TBText","page":"Backends","title":"TensorBoardLogger.TBText","text":"TBText(data)\n\nForces data to be serialized as text to TensorBoard.\n\n\n\n\n\n","category":"type"},{"location":"custom_behaviour/#TensorBoardLogger.TBHistogram","page":"Backends","title":"TensorBoardLogger.TBHistogram","text":"TBHistogram(data)\n\nForces data to be serialized as an histogram to TensorBoard.\n\n\n\n\n\n","category":"type"},{"location":"custom_behaviour/#TensorBoardLogger.TBVector","page":"Backends","title":"TensorBoardLogger.TBVector","text":"TBVector(data)\n\nForces data to be serialized as a vector in the histogram backend of TensorBoard.\n\n\n\n\n\n","category":"type"},{"location":"custom_behaviour/#TensorBoardLogger.TBAudio","page":"Backends","title":"TensorBoardLogger.TBAudio","text":"TBAudio(data, samplerate)\n\nForces data to be serialized as Audio to TensorBoard.\n\n\n\n\n\n","category":"type"},{"location":"custom_behaviour/#TensorBoardLogger.TBAudios","page":"Backends","title":"TensorBoardLogger.TBAudios","text":"TBAudios(data, samplerate)\n\nForces elements of Array data to be serialized as Audio to TensorBoard.\n\n\n\n\n\n","category":"type"},{"location":"custom_behaviour/#TensorBoardLogger.TBImage","page":"Backends","title":"TensorBoardLogger.TBImage","text":"TBImage(data, format)\n\nForces data to be serialized as an Image to TensorBoard.\n\n\n\n\n\n","category":"type"},{"location":"custom_behaviour/#TensorBoardLogger.TBImages","page":"Backends","title":"TensorBoardLogger.TBImages","text":"TBImages(data, format)\n\nForces elements of Array data to be serialized as an Image to TensorBoard.\n\n\n\n\n\n","category":"type"},{"location":"logging_details/#Introduction-1","page":"Introduction","title":"Introduction","text":"","category":"section"},{"location":"#TensorBoardLogger.jl-1","page":"Home","title":"TensorBoardLogger.jl","text":"","category":"section"},{"location":"#","page":"Home","title":"Home","text":"Log data to TensorBoard from Julia","category":"page"},{"location":"#","page":"Home","title":"Home","text":"TensorBoard is an interactive dashboard that can be used to visualize data generated from your programs. TensorBoardLogger is a Julia package that allows you to log data to TensorBoard through the standard Julia Logging system.","category":"page"},{"location":"#Installation-1","page":"Home","title":"Installation","text":"","category":"section"},{"location":"#","page":"Home","title":"Home","text":"To install this Julia package run the following command in the julia REPL:","category":"page"},{"location":"#","page":"Home","title":"Home","text":"] add TensorBoardLogger","category":"page"},{"location":"#","page":"Home","title":"Home","text":"note: Note\nTo log images to the Image backend of TensorBoard you must also install ImageMagick. You won't need to import it.] add ImageMagick","category":"page"},{"location":"#","page":"Home","title":"Home","text":"note: Note\nTensorBoardLogger only contains code to serialize data to TensorBoard. To run the TensorBoard interface, you should install it and run it. The easiest way to install it is to install TensorFlow. Instructions for running TensorBoard can be found on the GitHub page.","category":"page"},{"location":"#Basic-Usage-1","page":"Home","title":"Basic Usage","text":"","category":"section"},{"location":"#","page":"Home","title":"Home","text":"CurrentModule = TensorBoardLogger","category":"page"},{"location":"#","page":"Home","title":"Home","text":"The fundamental type defined in this package is a TBLogger, which behaves like other standard loggers in Julia such as ConsoleLogger or TextLogger. You can create one by passing it the path to the folder where you want to store the data. You can also pass an optional second argument to specify the behaviour in case there already exhist a document at the given path.","category":"page"},{"location":"#","page":"Home","title":"Home","text":"Once you have created a TBLogger, you can use it as you would use any other logger in Julia:     - You can set it to be your global logger with the function global_logger     - You can set it to be the current logger in a scope with the function with_logger     - You can combine it with other Loggers using LoggingExtras.jl, so that messages are logged to TensorBoard and to other backends at the same time.","category":"page"},{"location":"#","page":"Home","title":"Home","text":"using TensorBoardLogger, Logging, Random\n\nlg=TBLogger(\"tensorboard_logs/run\", min_level=Logging.Info)\n\nstruct sample_struct first_field; other_field; end\n\nwith_logger(lg) do\n    for i=1:100\n        x0          = 0.5+i/30; s0 = 0.5/(i/20);\n        edges       = collect(-5:0.1:5)\n        centers     = collect(edges[1:end-1] .+0.05)\n        histvals    = [exp(-((c-x0)/s0)^2) for c=centers]\n        data_tuple  = (edges, histvals)\n        data_struct = sample_struct(i^2, i^1.5-0.3*i)\n\n\n        @info \"test\" i=i j=i^2 dd=rand(10).+0.1*i hh=data_tuple\n        @info \"test_2\" i=i j=2^i hh=data_tuple log_step_increment=0\n        @info \"\" my_weird_struct=data_struct   log_step_increment=0\n        @debug \"debug_msg\" this_wont_show_up=i\n    end\nend","category":"page"},{"location":"#Backends-1","page":"Home","title":"Backends","text":"","category":"section"},{"location":"#","page":"Home","title":"Home","text":"TensorBoardLogger supports five backends:     - Scalars     - Distributions     - Images     - Audio     - Text/Markdown","category":"page"},{"location":"#","page":"Home","title":"Home","text":"When you log data to tensorboard, it is processed to convert it to the format used by TensorBoard. In particoular, fields in structures are logged individually individually and complex numbers/arrays are split into their real and imaginary parts. Depending on it's type, an object is serialized to the relevant backend, with the text backend being the default fallback.","category":"page"},{"location":"#","page":"Home","title":"Home","text":"For more detailed informations on how data is dispatched to a certain backend, and how to specify a desired backend refer to Specifying a backend.","category":"page"},{"location":"#","page":"Home","title":"Home","text":"If you want to define a new default behaviour for a custom type refer to section Extending TensorBoardLogger.","category":"page"},{"location":"#Explicit-logging-1","page":"Home","title":"Explicit logging","text":"","category":"section"},{"location":"#","page":"Home","title":"Home","text":"In alternative, you can also log data to TensorBoard through it's functional interface, by calling the relevant method with a tag string and the data. For information on this interface refer to @ref()...","category":"page"},{"location":"examples/optim/#Using-TensorBoard-with-Optim.jl-1","page":"Optim.jl","title":"Using TensorBoard with Optim.jl","text":"","category":"section"},{"location":"examples/optim/#","page":"Optim.jl","title":"Optim.jl","text":"using TensorBoardLogger\nusing Optim\nusing Logging\n\n# Returns a closure over a logger, that takes a Optim trace as input\nfunction make_tensorboardlogger_callback(dir=\"logs\")\n    logger = TBLogger(dir)\n\n    function callback(opt_state = Optim.OptimizationState)\n        with_logger(logger) do\n            @info \"\" opt_step = opt_state.iteration  function_value=opt_state.value gradient_norm=opt_state.g_norm\n        end\n        return false  # do not terminate optimisation\n    end\n    callback(trace::Optim.OptimizationTrace) = callback(last(trace))\n    return callback\nend\n\n\nrosenbrock(x) =  (1.0 - x[1])^2 + 100.0 * (x[2] - x[1]^2)^2\nresult = optimize(rosenbrock, zeros(2), BFGS(), Optim.Options(callback=make_tensorboardlogger_callback()))","category":"page"},{"location":"examples/optim/#","page":"Optim.jl","title":"Optim.jl","text":"(Image: optim_plot)","category":"page"}]
}
